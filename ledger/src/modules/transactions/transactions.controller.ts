import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.strategy';
import { TransactionsService } from './transactions.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly trx: TransactionsService) {}
}
