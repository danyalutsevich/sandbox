import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from './account.entity';
import { UserEntity } from '../user/user.entity';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountsRepo: Repository<AccountEntity>,
  ) {}

  listByUser(userId: string) {
    return this.accountsRepo.find({ where: { user: { id: userId } as any } });
  }

  async getBalance(accountId: number) {
    const acc = await this.accountsRepo.findOne({ where: { id: accountId } });
    return { balance: acc?.balance ?? '0.00' };
  }

  create(account: CreateAccountDto, user: any) {
    const acc = this.accountsRepo.create({
      type: account.type,
      balance: String(account.initialBalance),
      user: { id: user.userId } as any,
    });
    return this.accountsRepo.save(acc);
  }
}
