import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.strategy';
import { TransactionsService } from './transactions.service';
import { TransferDto } from './dto/transfer.dto';
import { ExchangeDto } from './dto/exchange.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly trx: TransactionsService) {}

  @Post('transfer')
  transfer(@Req() req: any, @Body() dto: TransferDto) {
    return this.trx.transfer(
      req.user.userId,
      dto.recipientUsername,
      dto.currency,
      dto.amount,
    );
  }

  @Post('exchange')
  exchange(@Req() req: any, @Body() dto: ExchangeDto) {
    return this.trx.exchange(req.user.userId, dto.source, dto.amount);
  }

  @Get()
  list(
    @Req() req: any,
    @Query('type') type?: 'transfer' | 'exchange',
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ) {
    return this.trx.list(req.user.userId, type, Number(page), Number(limit));
  }
}
