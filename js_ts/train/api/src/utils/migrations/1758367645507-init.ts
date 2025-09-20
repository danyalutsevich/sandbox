import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1758367645507 implements MigrationInterface {
    name = 'Init1758367645507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "train" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "capacity" integer NOT NULL, "manufacturer" character varying NOT NULL, "yearBuilt" integer NOT NULL, "status" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_0590a6e4276dfef1c8ba49f1c08" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "train"`);
    }

}
