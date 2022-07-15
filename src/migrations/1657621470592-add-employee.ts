import {MigrationInterface, QueryRunner} from "typeorm";

export class addEmployee1657621470592 implements MigrationInterface {
    name = 'addEmployee1657621470592'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dept" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "dept" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "dept" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "dept" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "dept" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "dept" DROP COLUMN "created_at"`);
    }

}
