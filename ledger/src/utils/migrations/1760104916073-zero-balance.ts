import { MigrationInterface, QueryRunner } from "typeorm";

export class ZeroBalance1760104916073 implements MigrationInterface {
    name = 'ZeroBalance1760104916073'

    public async up(queryRunner: QueryRunner): Promise<void> {
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
    }

}
