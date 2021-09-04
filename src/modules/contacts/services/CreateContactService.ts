import phone from 'phone';
import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import { ICreateContactRequest } from '../dtos/ICreateContact';
import { IPhone } from '../dtos/IPhone';
import { Contacts } from '../infra/typeorm/entities/Contact';
import ContactRepository from '../repositories/ContactReposiroty';

export class CreateContactService {
  public async execute({
    user_id,
    telephones,
  }: ICreateContactRequest): Promise<Array<Contacts>> {
    const phones = this.removeDuplicatedPhones(telephones);

    const invalidPhones = this.getAllInvalidPhones(phones);
    if (invalidPhones.length !== 0) {
      throw new AppError(
        `Something wrong with some phones: ${invalidPhones.join(', ')}`,
      );
    }

    const contactRepository = getCustomRepository(ContactRepository);

    const rawContacts = phones.map(phone => {
      return {
        user_id,
        contact: phone.number,
        area_code: phone.area_code,
      };
    });

    await contactRepository.insertBulk(rawContacts);

    return contactRepository.findAllByUserId(user_id);
  }

  private getAllInvalidPhones(phones: Array<IPhone>): Array<string> {
    const invalidPhones = phones
      .map((phone: IPhone) => this.joinAreaCodeAndNumber(phone))
      .filter((phoneNumber: string) => {
        return !phone(phoneNumber).isValid;
      });

    return invalidPhones;
  }

  private joinAreaCodeAndNumber(phone: IPhone): string {
    return `+${phone.area_code}${phone.number}`;
  }

  private removeDuplicatedPhones(phones: Array<IPhone>): Array<IPhone> {
    return phones.filter(
      (phone, index, self) =>
        self.findIndex(
          p => p.number === phone.number && p.area_code === phone.area_code,
        ) === index,
    );
  }
}

export default CreateContactService;
