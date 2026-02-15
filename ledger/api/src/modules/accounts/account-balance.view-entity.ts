import { ViewEntity, ViewColumn, OneToOne, JoinColumn } from 'typeorm';
import { AccountEntity } from './account.entity';

@ViewEntity({
  name: 'account_balances',
  expression: `
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
  `,
  // materialized: true,
})
export class AccountBalanceView {
  // @ViewColumn()
  // accountId: string;

  @OneToOne(() => AccountEntity, (account) => account.balance)
  @JoinColumn({ name: 'accountId' })
  account: AccountEntity;

  @ViewColumn()
  balance: number;
}
