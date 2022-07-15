import {MigrationInterface, QueryRunner} from "typeorm";

export class addAddress41657712443839 implements MigrationInterface {
    name = 'addAddress41657712443839'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_address" DROP CONSTRAINT "FK_1721e9ee3d928ad4636d094ea62"`);
        await queryRunner.query(`ALTER TABLE "employee_address" DROP CONSTRAINT "REL_1721e9ee3d928ad4636d094ea6"`);
        await queryRunner.query(`ALTER TABLE "employee_address" DROP COLUMN "employee_id"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "employee_address_id" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "employeeaddress_id" uuid`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_0473e84dc9444d9aadd3c33e707" UNIQUE ("employeeaddress_id")`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_0473e84dc9444d9aadd3c33e707" FOREIGN KEY ("employeeaddress_id") REFERENCES "employee_address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_0473e84dc9444d9aadd3c33e707"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_0473e84dc9444d9aadd3c33e707"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "employeeaddress_id"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "employee_address_id"`);
        await queryRunner.query(`ALTER TABLE "employee_address" ADD "employee_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee_address" ADD CONSTRAINT "REL_1721e9ee3d928ad4636d094ea6" UNIQUE ("employee_id")`);
        await queryRunner.query(`ALTER TABLE "employee_address" ADD CONSTRAINT "FK_1721e9ee3d928ad4636d094ea62" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
