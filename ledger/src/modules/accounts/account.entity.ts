import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  Unique,
  Index,
  OneToOne,
} from 'typeorm';
import { EntryEntity } from '../entry/entry.entity';
import { UserEntity } from '../user/user.entity';
import { CurrencyEntity } from '../currency/currency.entity';
import { AccountBalanceView } from './account-balance.view-entity';

@Entity({ name: 'accounts' })
@Unique('uq_user_currency', ['user', 'currency'])
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CurrencyEntity)
  currency: CurrencyEntity;

  @ManyToOne(() => UserEntity, (user) => user.accounts)
  user: UserEntity;

  @OneToOne(() => AccountBalanceView, (balance) => balance.account)
  balance: AccountBalanceView;

  @Column({ default: true })
  isConvertationAllowed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => EntryEntity, (entry) => entry.account)
  entries: EntryEntity[];
}
