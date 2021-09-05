import { InsertResult } from 'typeorm';

import { IRawContact } from '../dtos/IRawContact';
import { Contacts } from '../infra/typeorm/entities/Contact';

export interface IContactRepository {
  findAllByUserId(id: string): Promise<Array<Contacts>>;
  insertBulk(contacts: Array<IRawContact>): Promise<InsertResult>;
}
