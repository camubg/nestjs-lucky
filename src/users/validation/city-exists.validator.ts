import { Injectable } from '@nestjs/common';
import { CitiesRepository } from '../../repositories/cities.repository';
import {
  ValidatorConstraintInterface,
  ValidatorConstraint,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';

@ValidatorConstraint({ name: 'CityExists', async: true })
@Injectable()
export class CityExistsRule implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(CitiesRepository)
    private citiesRepository: CitiesRepository,
  ) {}

  async validate(value: number) {
    const found = await this.citiesRepository.getCityById(value);
    return !(!found);
  }

  defaultMessage(args: ValidationArguments) {
    return `CityId not found`;
  }
}

export function CityExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'CityExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: CityExistsRule,
    });
  };
}
