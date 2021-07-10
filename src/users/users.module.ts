import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesRepository } from 'src/repositories/addresses.repository';
import { CitiesRepository } from 'src/repositories/cities.repository';
import { CountriesRepository } from 'src/repositories/countries.repository';
import { ProfilesRepository } from 'src/repositories/profiles.repository';
import { UsersRepository } from 'src/repositories/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersRepository,
      AddressesRepository,
      CitiesRepository,
      ProfilesRepository,
      CountriesRepository
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}