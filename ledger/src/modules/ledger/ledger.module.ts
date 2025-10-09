import { Module } from '@nestjs/common';
import { LedgerService } from './ledger.service';
import { LedgerController } from './ledger.controller';
import { GetBalanceUseCase } from './use-cases/get-balance.usecase';
import { CreateTransactionUseCase } from './use-cases/create-transaction.usecase';

@Module({
  imports: [],
  controllers: [LedgerController],
  providers: [LedgerService, GetBalanceUseCase, CreateTransactionUseCase],
  exports: [LedgerService, GetBalanceUseCase, CreateTransactionUseCase],
})
export class LedgerModule {}
