import { Body, Controller, Post } from '@nestjs/common';
import { GetBalanceUseCase } from './use-cases/get-balance.usecase';
import { CreateTransactionUseCase } from './use-cases/create-transaction.usecase';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('ledger')
export class LedgerController {
  constructor(
    private readonly getBalanceUseCase: GetBalanceUseCase,
    private readonly createTransactionUseCase: CreateTransactionUseCase,
  ) {}

  @Post('create-transaction')
  createTransaction(@Body() dto: CreateTransactionDto) {
    return this.createTransactionUseCase.execute(dto);
  }

  @Post('get-balance')
  getBalances() {
    return this.getBalanceUseCase.execute();
  }
}
