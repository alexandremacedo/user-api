import { IAuthenticateUserRequest } from '@modules/users/dtos/IAuthenticateUserRequest';
import { IUserRepository } from '@modules/users/repositories/IUserReposiroty';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import authConfig from '../../../../config/auth';
import AppError from '../../../../shared/errors/AppError';

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    email,
    password,
  }: IAuthenticateUserRequest): Promise<{ token: string }> {
    const user = await this.userRepository.findByEmail(email);

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
