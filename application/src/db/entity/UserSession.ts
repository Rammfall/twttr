import { Entity, Column, PrimaryColumn, BaseEntity, ManyToOne } from 'typeorm';

import { UserSession1629023006862 } from '../migration/1629023006862-UserSession';
import validationLength from '../../constants/validations';
import UserAccount from './UserAccount';

@Entity({
  name: UserSession1629023006862.tableName,
})
class UserSession extends BaseEntity {
  @PrimaryColumn({
    name: 'sessionId',
    type: 'uuid',
    primary: true,
    nullable: false,
  })
  sessionId!: string;

  @Column({
    name: 'refreshToken',
    type: 'uuid',
    nullable: false,
  })
  refreshToken!: string;

  @Column({
    name: 'accessToken',
    type: 'text',
    nullable: false,
  })
  accessToken!: string;

  @Column({
    name: 'device',
    type: 'varchar',
    length: validationLength.session.device.maxLength,
    nullable: false,
  })
  device!: string;

  @Column({
    name: 'expiredDate',
    type: 'timestamp',
    nullable: false,
  })
  expiredDate!: Date;

  @Column({
    type: 'varchar',
    length: validationLength.session.ip.maxLength,
  })
  ip!: string;

  @Column({
    type: 'bigint',
  })
  readonly userId!: number;

  @ManyToOne(() => UserAccount, (user: UserAccount) => user.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user!: UserAccount;
}

export default UserSession;
