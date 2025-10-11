import { MigrationInterface, QueryRunner } from "typeorm";

export class View1760098282594 implements MigrationInterface {
    name = 'View1760098282594'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_abd224f8f01c72d53b1d76fb25"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "balance"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" ADD "balance" numeric(20,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`CREATE INDEX "IDX_abd224f8f01c72d53b1d76fb25" ON "accounts" ("balance") `);
    }

}
