import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  Unique,
  Index,
} from 'typeorm';
import { EntryEntity } from '../entry/entry.entity';
import { UserEntity } from '../user/user.entity';
import { CurrencyEntity } from '../currency/currency.entity';

@Entity({ name: 'accounts' })
@Unique('uq_user_currency', ['user', 'currency'])
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @IsEnum(AccountType)
  // @Column()
  // type: AccountType;

  @ManyToOne(() => CurrencyEntity)
  currency: CurrencyEntity;

  @ManyToOne(() => UserEntity, (user) => user.accounts)
  user: UserEntity;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  @Index()
  balance: string; // keep as string to preserve precision in DB

  @Column({ default: true })
  isConvertationAllowed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => EntryEntity, (entry) => entry.account)
  entries: EntryEntity[];
}
