import {MigrationInterface, QueryRunner} from "typeorm";

export class addEmployeeaddress1657678825460 implements MigrationInterface {
    name = 'addEmployeeaddress1657678825460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_d62835db8c0aec1d18a5a927549"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "department_id"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "name" character varying NOT NULL DEFAULT 'default'`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "department_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "address_line1" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "address_line2" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "state" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "employee_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_f9d306b968b54923539b3936b03" UNIQUE ("employee_id")`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_d62835db8c0aec1d18a5a927549" FOREIGN KEY ("department_id") REFERENCES "dept"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_f9d306b968b54923539b3936b03" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_f9d306b968b54923539b3936b03"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_d62835db8c0aec1d18a5a927549"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_f9d306b968b54923539b3936b03"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "employee_id"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "address_line2"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "address_line1"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "department_id"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "department_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_d62835db8c0aec1d18a5a927549" FOREIGN KEY ("department_id") REFERENCES "dept"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
