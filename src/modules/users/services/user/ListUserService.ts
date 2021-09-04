import { UserAdapter } from '@modules/users/adapters/UserAdapter';
import { IListUserRequest } from '@modules/users/dtos/IListUserRequest';
import { IListUserResult } from '@modules/users/dtos/IListUserResult';
import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import UserRepository from '../../repositories/UserReposiroty';

export class ListUserService {
  public async execute({ id }: IListUserRequest): Promise<IListUserResult> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    return new UserAdapter(user);
  }
}

export default ListUserService;
