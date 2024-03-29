import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import validationLength from '../../constants/validations';

import { UserAccount1620336005117 } from '../migration/1620336005117-UserAccount';

export enum Roles {
  admin = 'admin',
  user = 'user',
  owner = 'owner',
}

@Entity({
  name: UserAccount1620336005117.tableName,
})
class UserAccount extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({
    type: 'varchar',
    length: validationLength.user.username.maxLength,
    nullable: false,
    unique: true,
  })
  username!: string;

  @Column({
    type: 'varchar',
    length: validationLength.user.email.maxLength,
    nullable: false,
  })
  email!: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  password!: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'user', 'owner'],
  })
  role!: Roles;

  @CreateDateColumn({
    type: 'timestamp',
    default: 'NOW()',
    nullable: false,
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: 'NOW();',
    onUpdate: 'NOW()',
    nullable: false,
  })
  updatedAt!: Date;
}

export default UserAccount;
