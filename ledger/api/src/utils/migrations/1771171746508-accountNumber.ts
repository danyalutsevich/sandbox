import { MigrationInterface, QueryRunner } from "typeorm";

export class AccountNumber1771171746508 implements MigrationInterface {
    name = 'AccountNumber1771171746508'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" ADD "accountNumber" character varying(16) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "UQ_c57d6a982eeaa1d115687b17b63" UNIQUE ("accountNumber")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "UQ_c57d6a982eeaa1d115687b17b63"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "accountNumber"`);
    }

}
