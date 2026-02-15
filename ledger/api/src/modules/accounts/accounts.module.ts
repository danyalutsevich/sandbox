import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { ListAccountsByUserUseCase } from './use-cases/list-accounts-by-user.use-case';
import { GetAccountUseCase } from './use-cases/get-account.use-case';
import { CreateAccountUseCase } from './use-cases/create-account.use-case';

@Module({
  imports: [],
  controllers: [AccountsController],
  providers: [
    AccountsService,
    ListAccountsByUserUseCase,
    GetAccountUseCase,
    CreateAccountUseCase,
  ],
  exports: [AccountsService],
})
export class AccountsModule {}
