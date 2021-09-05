import ContactRepository from '@modules/contacts/infra/typeorm/repositories/ContactReposiroty';
import CreateContactService from '@modules/contacts/services/CreateContactService';
import { ICreateUserRequest } from '@modules/users/dtos/IUserContacts';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUserRepository } from '@modules/users/repositories/IUserReposiroty';
import { hash } from 'bcrypt';
import { validate } from 'class-validator';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

@injectable()
export class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
    telephones,
  }: ICreateUserRequest): Promise<User> {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const errors = await validate(user);

    if (errors.length !== 0) {
      throw new AppError(errors);
    }

    await this.userRepository.save(user);

    if (telephones.length !== 0) {
      const contactService = new CreateContactService(new ContactRepository());
      await contactService.execute({ user_id: user.id, telephones });
    }

    return user;
  }
}

export default CreateUserService;
