import { EntityRepository, getRepository, Repository } from 'typeorm';

import { User } from '../infra/typeorm/entities/User';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async findByEmail(email: string): Promise<User> {
    const findUser = await this.findOne({
      where: { email },
    });

    return findUser;
  }

  public async findById(id: string): Promise<User> {
    return getRepository(User)
      .createQueryBuilder('users')
      .innerJoinAndSelect('users.contacts', 'contacts')
      .where('users.id = :id', { id })
      .getOne();
  }
}

export default UserRepository;
