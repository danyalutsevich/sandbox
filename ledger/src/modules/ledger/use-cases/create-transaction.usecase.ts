import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import {
  AccountBalanceView,
  AccountEntity,
  EntryEntity,
  TransactionEntity,
} from 'src/utils/entities';
import { DataSource, Repository } from 'typeorm';
import { CreateTransactionDto } from '../dto/create-transaction.dto';

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepo: Repository<AccountEntity>,
    @InjectRepository(EntryEntity)
    private readonly entryRepo: Repository<EntryEntity>,
    @InjectRepository(TransactionEntity)
    private readonly transactionRepo: Repository<TransactionEntity>,
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(AccountBalanceView)
    private readonly accountBalanceViewRepo: Repository<AccountBalanceView>,
  ) {}

  async execute(dto: CreateTransactionDto) {
    const senderAccount = await this.accountRepo.findOne({
      where: { id: dto.sender.accountId, user: { id: dto.sender.userId } },
      relations: ['balance'],
    });

    if (!senderAccount) {
      throw new NotFoundException(
        'Sender account not found or does not belong to user',
      );
    }
    if (senderAccount.balance.balance < dto.amount) {
      throw new BadRequestException('Insufficient funds in sender account');
    }

    const receiverAccount = await this.accountRepo.findOne({
      where: { id: dto.receiver.accountId },
      relations: ['balance'],
    });

    if (!receiverAccount) {
      throw new NotFoundException('Receiver account not found');
    }

    return this.transactionRepo.manager.transaction(async (manager) => {
      const creditEntry = this.entryRepo.create({
        account: { id: dto.receiver.accountId },
        amount: dto.amount,
      });

      const debitEntry = this.entryRepo.create({
        account: { id: dto.sender.accountId },
        amount: -dto.amount,
      });

      const transaction = this.transactionRepo.create({
        description: dto.description,
        entries: [creditEntry, debitEntry],
      });

      await manager.save(transaction);

      // await this.dataSource.query('REFRESH MATERIALIZED VIEW account_balances');
    });
  }
}
