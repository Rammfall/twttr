import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

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
    length: 30,
    nullable: false,
    unique: true,
  })
  username!: string;

  @Column({
    type: 'varchar',
    length: 320,
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
