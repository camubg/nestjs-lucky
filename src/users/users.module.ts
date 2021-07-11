import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesRepository } from 'src/repositories/addresses.repository';
import { CitiesRepository } from 'src/repositories/cities.repository';
import { CountriesRepository } from 'src/repositories/countries.repository';
import { ProfilesRepository } from 'src/repositories/profiles.repository';
import { UsersRepository } from 'src/repositories/users.repository';
import { JwtStrategy } from './jwt.strategy';
import { UserExistsRule } from './user-exists.validator';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'privateSecret',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([
      UsersRepository,
      AddressesRepository,
      CitiesRepository,
      ProfilesRepository,
      CountriesRepository,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, UserExistsRule],
  exports: [JwtStrategy, PassportModule],
})
export class UsersModule {}
