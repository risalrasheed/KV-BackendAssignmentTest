import {MigrationInterface, QueryRunner} from "typeorm";

export class deletedextradeptid1657787207817 implements MigrationInterface {
    name = 'deletedextradeptid1657787207817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "employee_address_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "employee_address_id" character varying`);
    }

}
