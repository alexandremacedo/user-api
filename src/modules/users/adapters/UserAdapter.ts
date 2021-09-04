import { IPhone } from '@modules/contacts/dtos/IPhone';
import { Contacts } from '@modules/contacts/infra/typeorm/entities/Contact';

import { IListUserResult } from '../dtos/IListUserResult';
import { User } from '../infra/typeorm/entities/User';

export class UserAdapter implements IListUserResult {
  id: string;
  email: string;
  telephones: Array<IPhone>;
  created_at: Date;
  modified_at: Date;

  public constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.telephones = this.contactAdapter(user.contacts);
    this.created_at = user.created_at;
    this.modified_at = user.modified_at;
  }

  private contactAdapter(contacts: Array<Contacts>): Array<IPhone> {
    return contacts.map(userContact => {
      return {
        number: Number(userContact.contact),
        area_code: Number(userContact.area_code),
      };
    });
  }
}
