import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from '../account.entity';

@Injectable()
export class ListAccountsByUserUseCase {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountsRepo: Repository<AccountEntity>,
  ) {}

  execute(userId: string) {
    return this.accountsRepo.find({
      where: { user: { id: userId } as any },
      relations: ['currency', 'balance'],
    });
  }
}
