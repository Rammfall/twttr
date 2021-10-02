import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { UserAccount1620336005117 } from './1620336005117-UserAccount';

export class UserSession1629023006862 implements MigrationInterface {
  static tableName = 'UserSession';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: UserSession1629023006862.tableName,
        columns: [
          {
            name: 'sessionId',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'refreshToken',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'accessToken',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'device',
            type: 'varchar',
            length: '30',
            isNullable: false,
          },
          {
            name: 'expiredDate',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'userId',
            type: 'bigserial',
            isNullable: false,
          },
          {
            name: 'ip',
            type: 'varchar',
            length: '30',
            isNullable: false,
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      UserSession1629023006862.tableName,
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: UserAccount1620336005117.tableName,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(UserSession1629023006862.tableName);
  }
}
