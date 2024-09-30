import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1727700460807 implements MigrationInterface {
    name = 'Init1727700460807'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("userId" character varying NOT NULL, "balance" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
