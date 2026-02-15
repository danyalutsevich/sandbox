import { Module } from '@nestjs/common';
import { LedgerService } from './ledger.service';
import { LedgerController } from './ledger.controller';
import { GetAccountWithBalanceUseCase } from './use-cases/get-balance.usecase';
import { CreateTransactionUseCase } from './use-cases/create-transaction.usecase';

@Module({
  imports: [],
  controllers: [LedgerController],
  providers: [
    LedgerService,
    GetAccountWithBalanceUseCase,
    CreateTransactionUseCase,
  ],
  exports: [
    LedgerService,
    GetAccountWithBalanceUseCase,
    CreateTransactionUseCase,
  ],
})
export class LedgerModule {}
