import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { CurrencyEntity } from '../currency/currency.entity';

@Entity({ name: 'exchange_rates' })
@Index(['fromCurrency', 'toCurrency', 'date'], { unique: true })
export class ExchangeRateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CurrencyEntity, (currency) => currency.ratesFrom, {
    eager: true,
  })
  fromCurrency: CurrencyEntity;

  @ManyToOne(() => CurrencyEntity, (currency) => currency.ratesTo, {
    eager: true,
  })
  toCurrency: CurrencyEntity;

  @Column('decimal', { precision: 18, scale: 6 })
  rate: number; // e.g. 1 USD = 0.94 EUR

  @Column({ type: 'date' })
  date: Date;

  @CreateDateColumn()
  createdAt: Date;
}
