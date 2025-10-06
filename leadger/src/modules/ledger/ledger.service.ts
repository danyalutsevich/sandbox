import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TransactionEntity } from '../transactions/transaction.entity';
import { EntryEntity } from '../entry/entry.entity';

@Injectable()
export class LedgerService {
  constructor(private readonly dataSource: DataSource) {}

  async createTransaction(
    description: string,
    entries: { accountId: number; amount: string }[],
  ) {
    // must balance
    const total = entries.reduce((sum, e) => sum + Number(e.amount), 0);
    if (Number(total.toFixed(2)) !== 0) {
      throw new Error('transaction must be balanced (sum = 0)');
    }

    return this.dataSource.transaction(async (manager) => {
      const trx = manager.create(TransactionEntity, { description });
      await manager.save(trx);

      // lock accounts rows and update balances as we insert entries
      for (const e of entries) {
        // for update lock to prevent race conditions
        const account = await manager.query(
          `select * from accounts where id = $1 for update`,
          [e.accountId],
        );
        if (!account?.[0]) {
          throw new Error('account not found: ' + e.accountId);
        }

        const entry = manager.create(EntryEntity, {
          transaction: trx,
          account: { id: e.accountId as any },
          amount: e.amount,
        } as any);
        await manager.save(entry);

        await manager.query(
          `update accounts set balance = (balance::numeric + $1::numeric) where id = $2`,
          [e.amount, e.accountId],
        );
      }

      return trx;
    });
  }

  async getBalances() {
    return this.dataSource.query(`
      select a.id, a.type, a.balance::numeric as balance
      from accounts a
    `);
  }
}
