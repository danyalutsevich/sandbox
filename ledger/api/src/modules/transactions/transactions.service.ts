import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { TransactionEntity } from './transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService extends TypeOrmCrudService<TransactionEntity> {
  constructor(
    @InjectRepository(TransactionEntity)
    transactionRepo: Repository<TransactionEntity>,
  ) {
    super(transactionRepo);
  }
}
