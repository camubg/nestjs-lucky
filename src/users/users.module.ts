import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesRepository } from '../repositories/addresses.repository';
import { CitiesRepository } from '../repositories/cities.repository';
import { CountriesRepository } from '../repositories/countries.repository';
import { ProfilesRepository } from '../repositories/profiles.repository';
import { UsersRepository } from '../repositories/users.repository';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UserExistsRule } from './validation/user-exists.validator';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { async } from 'rxjs';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: 3600,
        },
      }),
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
