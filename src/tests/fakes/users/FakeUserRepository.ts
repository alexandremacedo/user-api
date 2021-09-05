import { ICreateUserRequest } from '@modules/users/dtos/IUserContacts';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUserRepository } from '@modules/users/repositories/IUserReposiroty';
import { uuid } from 'uuidv4';

class FakeUserRepository implements IUserRepository {
  private users: Array<User> = [];

  public async findByEmail(email: string): Promise<User> {
    const findUser = this.users.find(user => user.email === email);
    return findUser;
  }

  public async findById(id: string): Promise<User> {
    const findUser = this.users.find(user => user.id === id);
    return findUser;
  }

  public async create(userData: ICreateUserRequest): Promise<User> {
    const user = new User();

    Object.assign(
      user,
      {
        id: uuid(),
        created_at: new Date(),
        modified_at: new Date(),
      },
      userData,
    );

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
    this.users[findIndex] = user;
    return user;
  }
}

export default FakeUserRepository;
