import { Injectable } from '@nestjs/common';
import { ListAccountsByUserUseCase } from './use-cases/list-accounts-by-user.use-case';
import { GetAccountUseCase } from './use-cases/get-account.use-case';
import { CreateAccountUseCase } from './use-cases/create-account.use-case';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    private readonly listAccountsByUser: ListAccountsByUserUseCase,
    private readonly getAccountUseCase: GetAccountUseCase,
    private readonly createAccount: CreateAccountUseCase,
  ) {}

  listByUser(userId: string) {
    return this.listAccountsByUser.execute(userId);
  }

  getAccount(id: number) {
    return this.getAccountUseCase.execute(id);
  }

  create(dto: CreateAccountDto, user: any) {
    return this.createAccount.execute(dto, user);
  }
}
