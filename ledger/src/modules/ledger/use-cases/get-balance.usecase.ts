import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountBalanceView } from 'src/modules/accounts/account-balance.view-entity';
import {
  AccountEntity,
  EntryEntity,
  TransactionEntity,
} from 'src/utils/entities';
import { Repository } from 'typeorm';

@Injectable()
export class GetAccountWithBalanceUseCase {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountsRepo: Repository<AccountEntity>,
    @InjectRepository(EntryEntity)
    private readonly entryRepo: Repository<EntryEntity>,
    @InjectRepository(TransactionEntity)
    private readonly transactionRepo: Repository<TransactionEntity>,
    @InjectRepository(AccountBalanceView)
    private readonly accountBalanceViewRepo: Repository<AccountBalanceView>,
  ) {}

  async execute(accountId: number) {
    const account = await this.accountsRepo.findOne({
      where: { id: accountId },
      relations: ['balance'],
    });

    return account;
  }
}
