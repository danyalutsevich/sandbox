import {
  Controller,
  Get,
  Param,
  UseGuards,
  Req,
  Post,
  Body,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { JwtAuthGuard } from '../auth/jwt.strategy';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateAccountDto } from './dto/create-account.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accounts: AccountsService) {}

  @Get()
  list(@Req() req: any) {
    return this.accounts.listByUser(req.user.userId);
  }

  @Get(':id/balance')
  balance(@Param('id') id: string) {
    return this.accounts.getBalance(Number(id));
  }

  @Post()
  create(@Req() req: any, @Body() body: CreateAccountDto) {
    return this.accounts.create(body, req.user);
  }
}
