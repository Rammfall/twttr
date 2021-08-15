import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

import validationLength from 'constants/validations';

export enum Roles {
  admin = 'admin',
  user = 'user',
  owner = 'owner',
}

@Entity({
  name: 'UserAccount',
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
}

export default UserAccount;
