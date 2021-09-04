import { IPhone } from '@modules/contacts/dtos/IPhone';

export interface ICreateUserRequest {
  name: string;
  email: string;
  password: string;
  telephones: Array<IPhone>;
}
