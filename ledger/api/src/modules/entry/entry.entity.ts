import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';
import { AccountEntity } from '../accounts/account.entity';
import { TransactionEntity } from '../transactions/transaction.entity';
import { EntryType } from '../../utils/enums/entry-type.enum';

@Entity({ name: 'entries' })
export class EntryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AccountEntity, (account) => account.entries)
  account: AccountEntity;

  @ManyToOne(() => TransactionEntity, (transaction) => transaction.entries, {
    onDelete: 'CASCADE',
  })
  transaction: TransactionEntity;

  @Column({ type: 'numeric', precision: 20, scale: 2 })
  @Index()
  amount: number; // positive or negative values

  @Column({ nullable: true })
  type: EntryType;

  @CreateDateColumn()
  createdAt: Date;
}
