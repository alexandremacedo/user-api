import {
  EntityRepository,
  Repository,
  getConnection,
  InsertResult,
} from 'typeorm';

import { IRawContact } from '../dtos/IRawContact';
import { Contacts } from '../infra/typeorm/entities/Contact';

@EntityRepository(Contacts)
class ContactRepository extends Repository<Contacts> {
  public async findAllByUserId(id: string): Promise<Array<Contacts>> {
    const findUserContacts = await this.find({
      where: { id },
    });

    return findUserContacts;
  }

  public async insertBulk(contacts: Array<IRawContact>): Promise<InsertResult> {
    return getConnection()
      .createQueryBuilder()
      .insert()
      .into(Contacts)
      .values(contacts)
      .execute();
  }
}

export default ContactRepository;
