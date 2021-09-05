import { IContactRepository } from '@modules/contacts/repositories/IContactReposiroty';
import {
  Repository,
  getConnection,
  InsertResult,
  getRepository,
} from 'typeorm';

import { IRawContact } from '../../../dtos/IRawContact';
import { Contacts } from '../entities/Contact';

class ContactRepository implements IContactRepository {
  private ormRepository: Repository<Contacts>;
  constructor() {
    this.ormRepository = getRepository(Contacts);
  }

  public async findAllByUserId(id: string): Promise<Array<Contacts>> {
    const findUserContacts = await this.ormRepository.find({
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
