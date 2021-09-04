import { IListUserResult } from '@modules/users/dtos/IListUserResult';
import CreateUserService from '@modules/users/services/user/CreateUserService';
import ListUserService from '@modules/users/services/user/ListUserService';
import { Request, Response } from 'express';

import { User } from '../typeorm/entities/User';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, telephones } = request.body;

    const userService = new CreateUserService();
    const user: User = await userService.execute({
      name,
      email,
      password,
      telephones,
    });

    return response.status(200).json({
      id: user.id,
      created_at: user.created_at,
      modified_at: user.modified_at,
    });
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const listUserService = new ListUserService();

    const user: IListUserResult = await listUserService.execute({
      id: request.user.id,
    });

    return response.status(200).json(user);
  }
}
