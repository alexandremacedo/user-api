import { Contacts } from '@modules/contacts/infra/typeorm/entities/Contact';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @Exclude()
  @IsNotEmpty()
  password: string;

  @OneToMany(() => Contacts, contacts => contacts.user)
  @JoinColumn()
  contacts: Contacts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  modified_at: Date;
}
