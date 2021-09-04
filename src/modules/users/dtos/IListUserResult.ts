import { IPhone } from '@modules/contacts/dtos/IPhone';

export interface IListUserResult {
  id: string;
  email: string;
  telephones: Array<IPhone>;
  created_at: Date;
  modified_at: Date;
}
