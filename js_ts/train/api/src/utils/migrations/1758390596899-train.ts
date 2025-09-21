import { MigrationInterface, QueryRunner } from "typeorm";

export class Train1758390596899 implements MigrationInterface {
    name = 'Train1758390596899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "station" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lat" integer NOT NULL, "lng" integer NOT NULL, "code" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_cad1b3e7182ef8df1057b82f6aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "train" ADD "avgSpeed" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "train" DROP COLUMN "avgSpeed"`);
        await queryRunner.query(`DROP TABLE "station"`);
    }

}
