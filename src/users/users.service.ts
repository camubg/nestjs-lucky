import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressesRepository } from '../repositories/addresses.repository';
import { CitiesRepository } from '../repositories/cities.repository';
import { ProfilesRepository } from '../repositories/profiles.repository';
import { User } from '../repositories/entities/user.entity';
import { UsersRepository } from '../repositories/users.repository';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { UserSignUpDTO } from './dto/user-sign-up.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/jwt-payload.interface';
import { UserProfile } from './model/user-profile.model';
import { AddressProfile } from './model/address-profile.model';
import { Profile } from '../repositories/entities/profile.entity';
import { Address } from '../repositories/entities/address.entity';
import { CacheService } from './cache.service';

@Injectable()
export class UsersService {
  private logger = new Logger('UsersService');

  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    @InjectRepository(AddressesRepository)
    private addressesRepository: AddressesRepository,
    @InjectRepository(CitiesRepository)
    private citiesRepository: CitiesRepository,
    @InjectRepository(ProfilesRepository)
    private profilesRepository: ProfilesRepository,
    private jwtService: JwtService,
    private cacheService: CacheService,
  ) {}

  async addUser(userSignUpDTO: UserSignUpDTO): Promise<void> {
    const city = await this.citiesRepository.getCityById(userSignUpDTO.cityId);

    const newUser: User = null;
    const newAddress: Address = null;
    const newProfile: Profile = null;

    try {
      const newUser = await this.usersRepository.createUser(
        userSignUpDTO.username,
        userSignUpDTO.password,
      );
      const newAddress = await this.addressesRepository.createAddress(
        userSignUpDTO.address,
        city,
      );
      const newProfile = await this.profilesRepository.createProfile(
        userSignUpDTO.name,
        newUser,
        newAddress,
      );
    } catch (err) {
      this.rollbackAnyChanges(newUser, newAddress, newProfile);

      this.logger.error(
        `Error creating new user: ${userSignUpDTO.username} with error message:` +
          `${err.message} - ${err.detail}`,
      );
      throw new InternalServerErrorException(
        'Something got wrong, please contact support',
      );
    }
  }

  private async rollbackAnyChanges(
    newUser: User,
    newAddress: Address,
    newProfile: Profile,
  ) {
    await this.usersRepository.deleteUser(newUser);
    await this.addressesRepository.deleteAddress(newAddress);
    await this.profilesRepository.deleteProfile(newProfile);
  }

  async getProfileUser(userFound: User): Promise<UserProfile> {
    let userProfile = await this.cacheService.getUserProfile(userFound.id);

    if (!userProfile) {
      const profile = await this.profilesRepository.getProfileByUser(userFound);
      if (!profile) {
        this.logger.error(`Profile for user: ${userFound.username} not found`);
        throw new NotFoundException(`Profile not found`);
      }
      userProfile = this.createProfileUser(profile);
      this.cacheService.saveUserProfile(userFound.id, userProfile);
    }

    return userProfile;
  }

  private createProfileUser(profile: Profile): UserProfile {
    const addressToReturn = new AddressProfile(
      profile.address.street,
      profile.address.city.name,
      profile.address.city.country.name,
    );

    return new UserProfile(profile.id, profile.name, addressToReturn);
  }

  async loginUser(
    authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDTO;

    const user = await this.usersRepository.findOne({ username });

    if (user && await this.passwordsMatch(password, user.password)) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    }

    throw new UnauthorizedException(`Username or password is incorrect`);
  }

  private async passwordsMatch(inputPassword: string, storePassword: string) {
    return await bcrypt.compare(inputPassword, storePassword);
  }
}
