import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../repositories/users.repository';
import {
  ValidatorConstraintInterface,
  ValidatorConstraint,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';

@ValidatorConstraint({ name: 'UserUnique', async: true })
@Injectable()
export class UserUniqueRule implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async validate(value: string) {
    return await this.usersRepository.isUsernameUnique(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `User already exists`;
  }
}

export function UserUnique(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'UserUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UserUniqueRule,
    });
  };
}
