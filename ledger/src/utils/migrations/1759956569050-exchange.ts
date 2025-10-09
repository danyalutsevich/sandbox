import { MigrationInterface, QueryRunner } from "typeorm";

export class Exchange1759956569050 implements MigrationInterface {
    name = 'Exchange1759956569050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "exchange_rates" ("id" SERIAL NOT NULL, "rate" numeric(18,6) NOT NULL, "date" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "fromCurrencyId" integer, "toCurrencyId" integer, CONSTRAINT "PK_33a614bad9e61956079d817ebe2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_b5bc5d247b878402df6ec18c8b" ON "exchange_rates" ("fromCurrencyId", "toCurrencyId", "date") `);
        await queryRunner.query(`CREATE TABLE "currencies" ("id" SERIAL NOT NULL, "code" character varying(3) NOT NULL, "name" character varying(50) NOT NULL, "symbol" character varying(5), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9f8d0972aeeb5a2277e40332d29" UNIQUE ("code"), CONSTRAINT "PK_d528c54860c4182db13548e08c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "isConvertationAllowed" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "currencyId" integer`);
        await queryRunner.query(`ALTER TABLE "exchange_rates" ADD CONSTRAINT "FK_415443233bc372b832511afbe93" FOREIGN KEY ("fromCurrencyId") REFERENCES "currencies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exchange_rates" ADD CONSTRAINT "FK_bae363728dd2491011ec52c0574" FOREIGN KEY ("toCurrencyId") REFERENCES "currencies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_e8c438e1e0bba824729f420f2e4" FOREIGN KEY ("currencyId") REFERENCES "currencies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_e8c438e1e0bba824729f420f2e4"`);
        await queryRunner.query(`ALTER TABLE "exchange_rates" DROP CONSTRAINT "FK_bae363728dd2491011ec52c0574"`);
        await queryRunner.query(`ALTER TABLE "exchange_rates" DROP CONSTRAINT "FK_415443233bc372b832511afbe93"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "currencyId"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "isConvertationAllowed"`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "currencies"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b5bc5d247b878402df6ec18c8b"`);
        await queryRunner.query(`DROP TABLE "exchange_rates"`);
    }

}
