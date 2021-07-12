import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { AddressesRepository } from '../repositories/addresses.repository';
import { CitiesRepository } from '../repositories/cities.repository';
import { ProfilesRepository } from '../repositories/profiles.repository';
import { UsersRepository } from '../repositories/users.repository';
import { AddressProfile } from './model/address-profile.model';
import { UserProfile } from './model/user-profile.model';
import { UsersService } from './users.service';

const mockUsersRepository = () => ({
  createUser: jest.fn(),
  findOne: jest.fn()
});

const mockAddressesRepository = () => ({
  createAddress: jest.fn(),
});

const mockCitiesRepository = () => ({
  getCityById: jest.fn(),
});

const mockProfilesRepository = () => ({
  getProfileByUser: jest.fn(),
  createProfile: jest.fn(),
});

const mockJwtService = () => ({
    sign:jest.fn(),
});

const mockAuthCredentialsDTO = {
    username: 'lucky',
    password: 'secret'
}

const mockUserSignUpDTO = {
  username: 'lucky',
  password: 'secret',
  name: 'Argentina',
  address: 'Av Siempreviva 123',
  cityId: 3,
};

const mockUser = {
  id: 1,
  username: 'lucky',
  password: 'secret',
};

const mockCountry = {
  id: 2,
  name: 'Argentina',
};

const mockCity = {
  id: 3,
  name: 'Buenos Aires',
  country: mockCountry,
};

const mockAddress = {
  id: 4,
  street: 'Av Siempreviva 123',
  city: mockCity,
};

const mockProfile = {
  id: 5,
  name: 'lucky name',
  user: mockUser,
  address: mockAddress,
};

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository;
  let addressesRepository;
  let citiesRepository;
  let profilesRepository;
  let jwtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useFactory: mockUsersRepository },
        { provide: AddressesRepository, useFactory: mockAddressesRepository },
        { provide: CitiesRepository, useFactory: mockCitiesRepository },
        { provide: ProfilesRepository, useFactory: mockProfilesRepository },
        { provide: JwtService, useFactory: mockJwtService },
      ],
    }).compile();

    usersService = module.get(UsersService);
    usersRepository = module.get(UsersRepository);
    addressesRepository = module.get(AddressesRepository);
    citiesRepository = module.get(CitiesRepository);
    profilesRepository = module.get(ProfilesRepository);
    jwtService = module.get(JwtService);
  });

  describe('getProfileUser', () => {
    it('calls ProfilesRepository.getProfileByUser and creates and return a UserProfile', async () => {
      profilesRepository.getProfileByUser.mockResolvedValue(mockProfile);
      const result = await usersService.getProfileUser(mockUser);
      const addressExpected = new AddressProfile(
        'Av Siempreviva 123',
        'Buenos Aires',
        'Argentina',
      );
      const profileExpected = new UserProfile(5, 'lucky name', addressExpected);
      expect(result).toEqual(profileExpected);
    });

    it('calls ProfilesRepository.getProfileByUser and handles an error', async () => {
      profilesRepository.getProfileByUser.mockResolvedValue(null);
      expect(usersService.getProfileUser(mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('addUser', () => {
    it('cityId is invalid and fails', async () => {
      citiesRepository.getCityById.mockResolvedValue(null);
      expect(usersService.addUser(mockUserSignUpDTO)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('creates and saves in the db a new user', async () => {
      citiesRepository.getCityById.mockResolvedValue(mockCity);

      await usersService.addUser(mockUserSignUpDTO);
      expect(citiesRepository.getCityById).toHaveBeenCalled();
      expect(usersRepository.createUser).toHaveBeenCalled();
      expect(addressesRepository.createAddress).toHaveBeenCalled();
      expect(profilesRepository.createProfile).toHaveBeenCalled();
    });
  });

  describe('loginUser', () => {
    it('user not found for log in with credentials', async () => {
      usersRepository.findOne.mockResolvedValue(null);
      expect(usersService.loginUser(mockAuthCredentialsDTO)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('user logs in with credentials', async () => {
        // to do: resolve bcrypt.compare mocking
        // const accessToken = "token";
        // usersRepository.findOne.mockResolvedValue(mockUser);
        // jwtService.sign.mockResolvedValue(accessToken);
  
        // const result = await usersService.loginUser(mockAuthCredentialsDTO);
        // expect(result).toEqual({ accessToken });
      });

  });
});
 