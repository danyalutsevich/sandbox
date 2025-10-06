import { Body, Controller, Post } from '@nestjs/common';
import { LedgerService } from './ledger.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('ledger')
export class LedgerController {
  constructor(private readonly ledgerService: LedgerService) {}

  @Post('create-transaction')
  createTransaction(@Body() dto: CreateTransactionDto) {
    return this.ledgerService.createTransaction(dto.description, dto.entries);
  }

  @Post('get-balance')
  getBalances() {
    return this.ledgerService.getBalances();
  }
}
