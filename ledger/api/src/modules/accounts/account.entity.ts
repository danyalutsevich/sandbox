import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  Unique,
  OneToOne,
} from 'typeorm';
import { EntryEntity } from '../entry/entry.entity';
import { UserEntity } from '../user/user.entity';
import { CurrencyEntity } from '../currency/currency.entity';
import { AccountBalanceView } from './account-balance.view-entity';

@Entity({ name: 'accounts' })
@Unique('uq_user_currency', ['user', 'currency'])
export class AccountEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ type: 'varchar', length: 16, unique: true })
  accountNumber: string;

  @ManyToOne(() => CurrencyEntity)
  currency: CurrencyEntity;

  @ManyToOne(() => UserEntity, (user) => user.accounts)
  user: UserEntity;

  @OneToOne(() => AccountBalanceView, (balance) => balance.account)
  balance: AccountBalanceView;

  @Column({ default: true })
  isConvertationAllowed: boolean;

  @Column({ length: 5 })
  expiresAt: string;

  @Column({ length: 3 })
  cvv: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => EntryEntity, (entry) => entry.account)
  entries: EntryEntity[];
}
