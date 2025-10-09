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
export class GetBalanceUseCase {
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

  execute() {
    return this.accountBalanceViewRepo.find();
  }
}
