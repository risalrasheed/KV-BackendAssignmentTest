import {MigrationInterface, QueryRunner} from "typeorm";

export class addEmployee1657619354232 implements MigrationInterface {
    name = 'addEmployee1657619354232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dept" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_deff0441db275143073fd33362a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "dept"`);
    }

}
