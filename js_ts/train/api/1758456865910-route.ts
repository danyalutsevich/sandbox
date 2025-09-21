import { MigrationInterface, QueryRunner } from "typeorm";

export class Route1758456865910 implements MigrationInterface {
    name = 'Route1758456865910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "route" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "distance" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "originStationId" integer, "destinationStationId" integer, CONSTRAINT "PK_08affcd076e46415e5821acf52d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "train" ADD "nextStationId" integer`);
        await queryRunner.query(`ALTER TABLE "train" ADD "routeId" integer`);
        await queryRunner.query(`ALTER TABLE "route" ADD CONSTRAINT "FK_d588f3e901f3fdcb533051ab145" FOREIGN KEY ("originStationId") REFERENCES "station"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "route" ADD CONSTRAINT "FK_b0c92d4bd0ce76ce530cc6e6301" FOREIGN KEY ("destinationStationId") REFERENCES "station"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "train" ADD CONSTRAINT "FK_05f64f0aa1819f96ee013bf1e6d" FOREIGN KEY ("nextStationId") REFERENCES "station"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "train" ADD CONSTRAINT "FK_eff22ca4eed61ecf908b27f435a" FOREIGN KEY ("routeId") REFERENCES "route"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "train" DROP CONSTRAINT "FK_eff22ca4eed61ecf908b27f435a"`);
        await queryRunner.query(`ALTER TABLE "train" DROP CONSTRAINT "FK_05f64f0aa1819f96ee013bf1e6d"`);
        await queryRunner.query(`ALTER TABLE "route" DROP CONSTRAINT "FK_b0c92d4bd0ce76ce530cc6e6301"`);
        await queryRunner.query(`ALTER TABLE "route" DROP CONSTRAINT "FK_d588f3e901f3fdcb533051ab145"`);
        await queryRunner.query(`ALTER TABLE "train" DROP COLUMN "routeId"`);
        await queryRunner.query(`ALTER TABLE "train" DROP COLUMN "nextStationId"`);
        await queryRunner.query(`DROP TABLE "route"`);
    }

}
