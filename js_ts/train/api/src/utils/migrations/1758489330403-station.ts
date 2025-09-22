import { MigrationInterface, QueryRunner } from "typeorm";

export class Station1758489330403 implements MigrationInterface {
    name = 'Station1758489330403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "station" DROP COLUMN "lat"`);
        await queryRunner.query(`ALTER TABLE "station" ADD "lat" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "station" DROP COLUMN "lng"`);
        await queryRunner.query(`ALTER TABLE "station" ADD "lng" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "station" DROP COLUMN "lng"`);
        await queryRunner.query(`ALTER TABLE "station" ADD "lng" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "station" DROP COLUMN "lat"`);
        await queryRunner.query(`ALTER TABLE "station" ADD "lat" integer NOT NULL`);
    }

}
