import { IAuthenticateUserRequest } from '@modules/users/dtos/IAuthenticateUserRequest';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';

import authConfig from '../../../../config/auth';
import AppError from '../../../../shared/errors/AppError';
import UserRepository from '../../repositories/UserReposiroty';

class AuthenticateUserService {
  public async execute({
    email,
    password,
  }: IAuthenticateUserRequest): Promise<{ token: string }> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination!', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination!', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token: string = sign(
      {
        email: user.email,
      },
      secret,
      {
        subject: user.id,
        expiresIn,
      },
    );

    return {
      token,
    };
  }
}

export default AuthenticateUserService;
