import { Injectable } from '@nestjs/common';
import { CurrencyEntity } from './currency.entity';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CurrencyService extends TypeOrmCrudService<CurrencyEntity> {
  constructor(
    @InjectRepository(CurrencyEntity)
    currencyRepo: Repository<CurrencyEntity>,
  ) {
    super(currencyRepo);
  }
}
