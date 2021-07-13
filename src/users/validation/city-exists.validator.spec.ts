import { Test } from '@nestjs/testing';
import { CitiesRepository } from '../../repositories/cities.repository';
import { CityExistsRule } from './city-exists.validator';

const mockCitiesRepository = () => ({
  getCityById: jest.fn(),
});

const mockCountry = {
  id: 2,
  name: 'Argentina',
};

const mockCity = {
  id: 3,
  name: 'Buenos Aires',
  country: mockCountry,
};

describe('CityExistsRule', () => {
  let cityExistsRule: CityExistsRule;
  let citiesRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CityExistsRule,
        { provide: CitiesRepository, useFactory: mockCitiesRepository },
      ],
    }).compile();

    cityExistsRule = module.get(CityExistsRule);
    citiesRepository = module.get(CitiesRepository);
  });

  describe('validate', () => {
    it('validate if a city id exists and it does', async () => {
      citiesRepository.getCityById.mockResolvedValue(mockCity);
      const result = await cityExistsRule.validate(1);
      expect(result).toEqual(true);
    });

    it('validate if a city id exists and it does not', async () => {
      citiesRepository.getCityById.mockResolvedValue(null);
      const result = await cityExistsRule.validate(1);
      expect(result).toEqual(false);
    });
  });
});
