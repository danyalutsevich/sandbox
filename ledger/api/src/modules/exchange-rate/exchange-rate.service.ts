import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { ExchangeRateEntity } from './exchange-rate.entity';

@Injectable()
export class ExchangeRateService extends TypeOrmCrudService<ExchangeRateEntity> {
  constructor(
    @InjectRepository(ExchangeRateEntity)
    exchangeRateRepo: Repository<ExchangeRateEntity>,
  ) {
    super(exchangeRateRepo);
  }
}
