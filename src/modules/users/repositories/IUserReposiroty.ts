import { ICreateUser } from '../dtos/ICreateUser';
import { User } from '../infra/typeorm/entities/User';

export interface IUserRepository {
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  create(user: ICreateUser): Promise<User>;
  save(user: User): Promise<User>;
}
