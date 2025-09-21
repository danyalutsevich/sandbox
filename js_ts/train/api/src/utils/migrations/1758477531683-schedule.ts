import { MigrationInterface, QueryRunner } from "typeorm";

export class Schedule1758477531683 implements MigrationInterface {
    name = 'Schedule1758477531683'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "schedule" ("id" SERIAL NOT NULL, "departureTime" TIMESTAMP NOT NULL, "arrivalTime" TIMESTAMP NOT NULL, "platform" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "routeId" integer, "trainId" integer, CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_3b4f19c3286140b393ee9af676e" FOREIGN KEY ("routeId") REFERENCES "route"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_ab7422ea721da76e64f3c51ba1d" FOREIGN KEY ("trainId") REFERENCES "train"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_ab7422ea721da76e64f3c51ba1d"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_3b4f19c3286140b393ee9af676e"`);
        await queryRunner.query(`DROP TABLE "schedule"`);
    }

}
