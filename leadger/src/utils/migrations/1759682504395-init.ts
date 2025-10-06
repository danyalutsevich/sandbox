import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1759682504395 implements MigrationInterface {
    name = 'Init1759682504395'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "balance" numeric(20,2) NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "uq_user_currency" UNIQUE ("userId", "type"), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_abd224f8f01c72d53b1d76fb25" ON "accounts" ("balance") `);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "entries" ("id" SERIAL NOT NULL, "amount" numeric(20,2) NOT NULL, "type" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "accountId" integer, "transactionId" integer, CONSTRAINT "PK_23d4e7e9b58d9939f113832915b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c83478742f5a90c6322738d39c" ON "entries" ("amount") `);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "entries" ADD CONSTRAINT "FK_20057e4a2a8cbe7c718bfd8cb26" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "entries" ADD CONSTRAINT "FK_058bb93b1cb558d918d7dedc699" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entries" DROP CONSTRAINT "FK_058bb93b1cb558d918d7dedc699"`);
        await queryRunner.query(`ALTER TABLE "entries" DROP CONSTRAINT "FK_20057e4a2a8cbe7c718bfd8cb26"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c83478742f5a90c6322738d39c"`);
        await queryRunner.query(`DROP TABLE "entries"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_abd224f8f01c72d53b1d76fb25"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
