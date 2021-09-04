import { IPhone } from './IPhone';

export interface ICreateContactRequest {
  user_id: string;
  telephones: Array<IPhone>;
}
