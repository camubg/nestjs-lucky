import { Test } from '@nestjs/testing';
import { UsersRepository } from '../../repositories/users.repository';
import { UserUniqueRule } from './user-unique.validator';

const mockUsersRepository = () => ({
  isUsernameUnique: jest.fn(),
});

describe('UserUniqueRule', () => {
  let userUniqueRule: UserUniqueRule;
  let usersRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserUniqueRule,
        { provide: UsersRepository, useFactory: mockUsersRepository },
      ],
    }).compile();

    userUniqueRule = module.get(UserUniqueRule);
    usersRepository = module.get(UsersRepository);
  });

  describe('validate', () => {
    it('validate if a user already exists and it does', async () => {
      usersRepository.isUsernameUnique.mockResolvedValue(false);
      const result = await userUniqueRule.validate('mockUser');
      expect(result).toEqual(false);
    });

    it('validate if a user already exists and it does not', async () => {
      usersRepository.isUsernameUnique.mockResolvedValue(true);
      const result = await userUniqueRule.validate('mockUser');
      expect(result).toEqual(true);
    });
  });
});
