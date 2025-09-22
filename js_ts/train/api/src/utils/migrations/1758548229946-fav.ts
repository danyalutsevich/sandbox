import { MigrationInterface, QueryRunner } from "typeorm";

export class Fav1758548229946 implements MigrationInterface {
    name = 'Fav1758548229946'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favorite" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, "scheduleId" integer NOT NULL, CONSTRAINT "UQ_eb3026e0855d2702bfe88e699e4" UNIQUE ("userId", "scheduleId"), CONSTRAINT "PK_495675cec4fb09666704e4f610f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_83b775fdebbe24c29b2b5831f2d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_155ebb3254c4ae02b5b10a6f5f2" FOREIGN KEY ("scheduleId") REFERENCES "schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_155ebb3254c4ae02b5b10a6f5f2"`);
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_83b775fdebbe24c29b2b5831f2d"`);
        await queryRunner.query(`DROP TABLE "favorite"`);
    }

}
