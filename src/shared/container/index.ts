import ContactRepository from '@modules/contacts/infra/typeorm/repositories/ContactReposiroty';
import { IContactRepository } from '@modules/contacts/repositories/IContactReposiroty';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserReposiroty';
import { IUserRepository } from '@modules/users/repositories/IUserReposiroty';
import { container } from 'tsyringe';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IContactRepository>(
  'ContactRepository',
  ContactRepository,
);
