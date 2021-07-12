import { Test } from '@nestjs/testing';
import { UsersRepository } from '../../repositories/users.repository';
import { UserExistsRule } from './user-exists.validator';

const mockUsersRepository = () => ({
  isUsernameUnique: jest.fn(),
});

describe('UserExistsRule', () => {
  let userExistsRule: UserExistsRule;
  let usersRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserExistsRule,
        { provide: UsersRepository, useFactory: mockUsersRepository },
      ],
    }).compile();

    userExistsRule = module.get(UserExistsRule);
    usersRepository = module.get(UsersRepository);
  });

  describe('validate', () => {
    it('validate if a user already exists and it does', async () => {
      usersRepository.isUsernameUnique.mockResolvedValue(false);
      const result = await userExistsRule.validate('mockUser');
      expect(result).toEqual(false);
    });

    it('validate if a user already exists and it does not', async () => {
      usersRepository.isUsernameUnique.mockResolvedValue(true);
      const result = await userExistsRule.validate('mockUser');
      expect(result).toEqual(true);
    });
  });
});
