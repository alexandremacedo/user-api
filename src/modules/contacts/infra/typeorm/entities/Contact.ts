import { User } from '@modules/users/infra/typeorm/entities/User';
import { IsNotEmpty, Max } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('contacts')
export class Contacts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  area_code: number;

  @Column()
  contact: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  modified_at: Date;
}
