import CreateContactService from '@modules/contacts/services/CreateContactService';
import { ICreateUserRequest } from '@modules/users/dtos/IUserContacts';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { hash } from 'bcrypt';
import { validate } from 'class-validator';
import { getCustomRepository } from 'typeorm';

import AppError from '../../../../shared/errors/AppError';
import UserRepository from '../../repositories/UserReposiroty';

export class CreateUserService {
  public async execute({
    name,
    email,
    password,
    telephones,
  }: ICreateUserRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const checkUserExists = await userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const errors = await validate(user);

    if (errors) {
      throw new AppError(errors);
    }

    await userRepository.save(user);

    const contactService = new CreateContactService();
    await contactService.execute({ user_id: user.id, telephones });

    return user;
  }
}

export default CreateUserService;
