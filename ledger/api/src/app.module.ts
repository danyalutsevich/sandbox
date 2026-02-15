import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Entities from './utils/entities';
import { ConfigModule } from '@nestjs/config';
import { GlobalModule } from './modules/global/global.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { LedgerModule } from './modules/ledger/ledger.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { CurrencyModule } from './modules/currency/currency.module';
import { ExchangeRateModule } from './modules/exchange-rate/exchange-rate.module';
import { EntryModule } from './modules/entry/entry.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      entities: Object.values(Entities),
      logging: true,
    }),
    GlobalModule,
    UserModule,
    AuthModule,
    LedgerModule,
    AccountsModule,
    TransactionsModule,
    CurrencyModule,
    ExchangeRateModule,
    EntryModule,
  ],
})
export class AppModule {}
