import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from '../account.entity';

@Injectable()
export class GetAccountUseCase {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountsRepo: Repository<AccountEntity>,
  ) {}

  execute(id: number) {
    return this.accountsRepo.findOne({
      where: { id },
      relations: ['currency', 'balance'],
    });
  }
}
