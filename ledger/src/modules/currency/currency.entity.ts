import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { ExchangeRateEntity } from '../exchange-rate/exchange-rate.entity';

@Entity({ name: 'currencies' })
@Unique(['code'])
export class CurrencyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 3 })
  code: string; // e.g. 'USD', 'EUR'

  @Column({ length: 50 })
  name: string; // e.g. 'US Dollar'

  @Column({ length: 5, nullable: true })
  symbol?: string; // e.g. '$', '€'

  @OneToMany(() => ExchangeRateEntity, (rate) => rate.fromCurrency)
  ratesFrom: ExchangeRateEntity[];

  @OneToMany(() => ExchangeRateEntity, (rate) => rate.toCurrency)
  ratesTo: ExchangeRateEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
