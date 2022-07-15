import {MigrationInterface, QueryRunner} from "typeorm";

export class addEmployeeaddress31657687395500 implements MigrationInterface {
    name = 'addEmployeeaddress31657687395500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_f9d306b968b54923539b3936b03"`);
        await queryRunner.query(`CREATE TABLE "employee_address" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address_line1" character varying NOT NULL, "address_line2" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "employee_id" uuid NOT NULL, CONSTRAINT "REL_1721e9ee3d928ad4636d094ea6" UNIQUE ("employee_id"), CONSTRAINT "PK_2a4f5082f1be346e2b8cdec2194" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "address_line1"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "address_line2"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_f9d306b968b54923539b3936b03"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "employee_id"`);
        await queryRunner.query(`ALTER TABLE "employee_address" ADD CONSTRAINT "FK_1721e9ee3d928ad4636d094ea62" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_address" DROP CONSTRAINT "FK_1721e9ee3d928ad4636d094ea62"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "employee_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_f9d306b968b54923539b3936b03" UNIQUE ("employee_id")`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "state" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "address_line2" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "address_line1" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "employee_address"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_f9d306b968b54923539b3936b03" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
