import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1769978585357 implements MigrationInterface {
    name = 'Init1769978585357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exchange_rates" ("id" SERIAL NOT NULL, "rate" numeric(18,6) NOT NULL, "date" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "fromCurrencyId" integer, "toCurrencyId" integer, CONSTRAINT "PK_33a614bad9e61956079d817ebe2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_b5bc5d247b878402df6ec18c8b" ON "exchange_rates" ("fromCurrencyId", "toCurrencyId", "date") `);
        await queryRunner.query(`CREATE TABLE "currencies" ("id" SERIAL NOT NULL, "code" character varying(3) NOT NULL, "name" character varying(50) NOT NULL, "symbol" character varying(5), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9f8d0972aeeb5a2277e40332d29" UNIQUE ("code"), CONSTRAINT "PK_d528c54860c4182db13548e08c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" SERIAL NOT NULL, "isConvertationAllowed" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "currencyId" integer, "userId" integer, CONSTRAINT "uq_user_currency" UNIQUE ("userId", "currencyId"), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "entries" ("id" SERIAL NOT NULL, "amount" numeric(20,2) NOT NULL, "type" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "accountId" integer, "transactionId" integer, CONSTRAINT "PK_23d4e7e9b58d9939f113832915b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c83478742f5a90c6322738d39c" ON "entries" ("amount") `);
        await queryRunner.query(`ALTER TABLE "exchange_rates" ADD CONSTRAINT "FK_415443233bc372b832511afbe93" FOREIGN KEY ("fromCurrencyId") REFERENCES "currencies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exchange_rates" ADD CONSTRAINT "FK_bae363728dd2491011ec52c0574" FOREIGN KEY ("toCurrencyId") REFERENCES "currencies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_e8c438e1e0bba824729f420f2e4" FOREIGN KEY ("currencyId") REFERENCES "currencies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "entries" ADD CONSTRAINT "FK_20057e4a2a8cbe7c718bfd8cb26" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "entries" ADD CONSTRAINT "FK_058bb93b1cb558d918d7dedc699" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE VIEW "account_balances" AS 
    SELECT
      a.id AS "accountId",
      COALESCE(
        SUM(
          CASE WHEN e.type = 'credit'
               THEN e.amount
               ELSE -e.amount
          END
        ),
        0
      ) AS balance
    FROM accounts a
    LEFT JOIN entries e ON e."accountId" = a.id
    GROUP BY a.id
  `);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","account_balances","SELECT\n      a.id AS \"accountId\",\n      COALESCE(\n        SUM(\n          CASE WHEN e.type = 'credit'\n               THEN e.amount\n               ELSE -e.amount\n          END\n        ),\n        0\n      ) AS balance\n    FROM accounts a\n    LEFT JOIN entries e ON e.\"accountId\" = a.id\n    GROUP BY a.id"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","account_balances","public"]);
        await queryRunner.query(`DROP VIEW "account_balances"`);
        await queryRunner.query(`ALTER TABLE "entries" DROP CONSTRAINT "FK_058bb93b1cb558d918d7dedc699"`);
        await queryRunner.query(`ALTER TABLE "entries" DROP CONSTRAINT "FK_20057e4a2a8cbe7c718bfd8cb26"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_e8c438e1e0bba824729f420f2e4"`);
        await queryRunner.query(`ALTER TABLE "exchange_rates" DROP CONSTRAINT "FK_bae363728dd2491011ec52c0574"`);
        await queryRunner.query(`ALTER TABLE "exchange_rates" DROP CONSTRAINT "FK_415443233bc372b832511afbe93"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c83478742f5a90c6322738d39c"`);
        await queryRunner.query(`DROP TABLE "entries"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`DROP TABLE "currencies"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b5bc5d247b878402df6ec18c8b"`);
        await queryRunner.query(`DROP TABLE "exchange_rates"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
