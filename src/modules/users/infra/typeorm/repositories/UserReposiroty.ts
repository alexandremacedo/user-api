import { ICreateUser } from '@modules/users/dtos/ICreateUser';
import { IUserRepository } from '@modules/users/repositories/IUserReposiroty';
import { validate } from 'class-validator';
import { EntityRepository, getRepository, Repository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import { User } from '../entities/User';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;
  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User> {
    const findUser = await this.ormRepository.findOne({
      where: { email },
    });

    return findUser;
  }

  public async findById(id: string): Promise<User> {
    return getRepository(User)
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.contacts', 'contacts')
      .where('users.id = :id', { id })
      .getOne();
  }

  public async create(userData: ICreateUser): Promise<User> {
    const user = this.ormRepository.create(userData);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UserRepository;
