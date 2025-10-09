import { MigrationInterface, QueryRunner } from "typeorm";

export class Balance1759959633326 implements MigrationInterface {
    name = 'Balance1759959633326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE MATERIALIZED VIEW "account_balances" AS 
    SELECT
      e."accountId" AS "accountId",
      SUM(
        CASE WHEN e.type = 'credit'
             THEN e.amount
             ELSE -e.amount
        END
      ) AS balance
    FROM entries e
    GROUP BY e."accountId"
  `);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","MATERIALIZED_VIEW","account_balances","SELECT\n      e.\"accountId\" AS \"accountId\",\n      SUM(\n        CASE WHEN e.type = 'credit'\n             THEN e.amount\n             ELSE -e.amount\n        END\n      ) AS balance\n    FROM entries e\n    GROUP BY e.\"accountId\""]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["MATERIALIZED_VIEW","account_balances","public"]);
        await queryRunner.query(`DROP MATERIALIZED VIEW "account_balances"`);
    }

}
