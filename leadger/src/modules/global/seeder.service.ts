import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { AccountEntity } from '../accounts/account.entity';
import { AccountType } from '../../utils/enums/account-type.enum';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(private readonly dataSource: DataSource) {}

  async onApplicationBootstrap() {
    // ensure 3 users exist with accounts and initial balances
    const existing = await this.dataSource.getRepository(UserEntity).count();
    if (existing >= 3) return;

    console.log('Seeding initial users and accounts...');
    await this.dataSource.transaction(async (manager) => {
      const users = [
        { username: 'alice', email: 'alice@example.com', password: 'password' },
        { username: 'bob', email: 'bob@example.com', password: 'password' },
        { username: 'carol', email: 'carol@example.com', password: 'password' },
      ];

      for (const u of users) {
        let user = await manager.findOne(UserEntity, {
          where: { username: u.username },
        });
        if (!user) {
          user = manager.create(UserEntity, u);
          await manager.save(user);
        }

        // create USD and EUR accounts if not exist
        for (const type of [AccountType.USD, AccountType.EUR]) {
          let account = await manager.findOne(AccountEntity, {
            where: { user: { id: user.id } as any, type },
            relations: ['user'],
          });
          if (!account) {
            account = manager.create(AccountEntity, {
              user: user as any,
              type,
              balance: '0.00',
            } as any);
            await manager.save(account);
          }
        }
      }
    });

    // seed initial balances by inserting entries and updating balances
    // Initial USD 1000, EUR 500 each
    const accounts = await this.dataSource.getRepository(AccountEntity).find({
      relations: ['user'],
    });

    // use simple updates; in real-world, we would create system equity account to balance
    for (const account of accounts) {
      const target = account.type === AccountType.USD ? '1000.00' : '500.00';
      if (Number(account.balance) >= Number(target)) continue;
      await this.dataSource.query(
        `update accounts set balance = $1 where id = $2`,
        [target, account.id],
      );
    }
  }
}
