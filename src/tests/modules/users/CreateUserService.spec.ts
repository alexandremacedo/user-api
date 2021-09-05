import CreateUserService from './CreateUserService';
import FakeUserRepository from '../../../../tests/fakes/users/FakeUserRepository';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeRepository = new FakeUserRepository();
    const createUserService = new CreateUserService(fakeRepository);
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123123',
      telephones: [
        { area_code: 55, number: 12997433479 },
        { area_code: 55, number: 12995200259 },
      ],
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toHaveProperty('john Doe');
    expect(user.email).toHaveProperty('johndoe@gmail.com');
  });

  it('should be able to create a new user  email', () => {
    expect(1 + 2).toEqual(3);
  });

  it('should be able to create a new user', () => {
    expect(1 + 2).toEqual(3);
  });

  it('should be able to create a new user', () => {
    expect(1 + 2).toEqual(3);
  });

  it('should be able to create a new user', () => {
    expect(1 + 2).toEqual(3);
  });
});
