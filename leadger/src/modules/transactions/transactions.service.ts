import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { AccountEntity } from '../accounts/account.entity';
import { LedgerService } from '../ledger/ledger.service';
import { AccountType } from '../../utils/enums/account-type.enum';
import { TransactionEntity } from './transaction.entity';

const USD_TO_EUR = 0.92;

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
    @InjectRepository(AccountEntity)
    private readonly accounts: Repository<AccountEntity>,
    @InjectRepository(TransactionEntity)
    private readonly transactions: Repository<TransactionEntity>,
    private readonly ledger: LedgerService,
  ) {}

  private async getUserAccount(userId: string, currency: AccountType) {
    const account = await this.accounts.findOne({
      where: { user: { id: userId } as any, type: currency },
      relations: ['user'],
    });
    if (!account) throw new NotFoundException('Account not found');
    return account;
  }

  async transfer(
    senderUserId: string,
    recipientUsername: string,
    currency: AccountType,
    amount: number,
  ) {
    if (amount <= 0) throw new BadRequestException('Amount must be positive');
    const senderAcc = await this.getUserAccount(senderUserId, currency);
    const recipient = await this.users.findOne({
      where: { username: recipientUsername },
    });
    if (!recipient) throw new NotFoundException('Recipient not found');
    const recipientAcc = await this.getUserAccount(
      String(recipient.id),
      currency,
    );

    // check funds with lock
    await this.ledger.createTransaction('transfer', [
      { accountId: senderAcc.id, amount: (-amount).toFixed(2) },
      { accountId: recipientAcc.id, amount: amount.toFixed(2) },
    ]);

    return { ok: true };
  }

  async exchange(userId: string, source: AccountType, amount: number) {
    if (amount <= 0) throw new BadRequestException('Amount must be positive');
    const sourceAcc = await this.getUserAccount(userId, source);
    const target =
      source === AccountType.USD ? AccountType.EUR : AccountType.USD;
    const targetAcc = await this.getUserAccount(userId, target);

    const debit = amount;
    const credit =
      source === AccountType.USD
        ? Number((amount * USD_TO_EUR).toFixed(2))
        : Number((amount / USD_TO_EUR).toFixed(2));

    await this.ledger.createTransaction('exchange', [
      { accountId: sourceAcc.id, amount: (-debit).toFixed(2) },
      { accountId: targetAcc.id, amount: credit.toFixed(2) },
    ]);

    return { ok: true };
  }

  async list(
    userId: string,
    type?: 'transfer' | 'exchange',
    page = 1,
    limit = 20,
  ) {
    // naive listing by joining entries -> transactions for user's accounts
    const accounts = await this.accounts.find({
      where: { user: { id: userId } as any },
    });
    const accountIds = accounts.map((a) => a.id);
    if (accountIds.length === 0) return { data: [], total: 0, page, limit };

    const qb = this.transactions
      .createQueryBuilder('t')
      .leftJoin('t.entries', 'e')
      .where('e.accountId IN (:...ids)', { ids: accountIds })
      .orderBy('t.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .select(['t.id', 't.description', 't.createdAt']);

    const [rows, total] = await qb.getManyAndCount();
    return { data: rows, total, page, limit };
  }
}
