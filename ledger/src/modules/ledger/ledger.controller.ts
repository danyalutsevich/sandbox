import { Body, Controller, Post, Query } from '@nestjs/common';
import { GetAccountWithBalanceUseCase } from './use-cases/get-balance.usecase';
import { CreateTransactionUseCase } from './use-cases/create-transaction.usecase';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('ledger')
export class LedgerController {
  constructor(
    private readonly getAccountWithBalanceUseCase: GetAccountWithBalanceUseCase,
    private readonly createTransactionUseCase: CreateTransactionUseCase,
  ) {}

  @Post('create-transaction')
  createTransaction(@Body() dto: CreateTransactionDto) {
    return this.createTransactionUseCase.execute(dto);
  }

  @Post('get-balance')
  getBalances(@Query('accountId') accountId: number) {
    return this.getAccountWithBalanceUseCase.execute(accountId);
  }
}
