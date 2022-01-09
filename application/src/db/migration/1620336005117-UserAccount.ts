import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserAccount1620336005117 implements MigrationInterface {
  static tableName = 'UserAccount';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: UserAccount1620336005117.tableName,
        columns: [
          {
            name: 'id',
            type: 'bigserial',
            isPrimary: true,
          },
          {
            name: 'username',
            type: 'varchar',
            length: '30',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '320',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'password',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'role',
            type: 'enum',
            enum: ['admin', 'user', 'owner'],
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'NOW()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'NOW()',
            onUpdate: 'NOW()',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(UserAccount1620336005117.tableName);
  }
}
