import { UserAdapter } from '@modules/users/adapters/UserAdapter';
import { IListUserRequest } from '@modules/users/dtos/IListUserRequest';
import { IListUserResult } from '@modules/users/dtos/IListUserResult';
import { IUserRepository } from '@modules/users/repositories/IUserReposiroty';

import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ id }: IListUserRequest): Promise<IListUserResult> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    return new UserAdapter(user);
  }
}

export default ListUserService;
