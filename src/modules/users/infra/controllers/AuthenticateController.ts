import AuthenticateUserService from '@modules/users/services/auth/AuthenticateUserService';
import { Request, Response } from 'express';

export default class AuthenticateController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateUser = new AuthenticateUserService();

    const { token } = await authenticateUser.execute({
      email,
      password,
    });

    return response.status(200).json({ token });
  }
}
