import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  name: 'account_balances',
  expression: `
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
  `,
  materialized: true,
})
export class AccountBalanceView {
  @ViewColumn()
  accountId: string;

  @ViewColumn()
  balance: number;
}
