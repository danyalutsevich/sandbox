import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { AccountEntity } from '../account.entity';
import { CreateAccountDto } from '../dto/create-account.dto';

@Injectable()
export class CreateAccountUseCase {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountsRepo: Repository<AccountEntity>,
    private readonly configService: ConfigService,
  ) {}

  execute(dto: CreateAccountDto, user: any) {
    const accountNumber = this.generateAccountNumber();
    const expiresAt = this.generateExpiryDate();
    const cvv = this.generateCvv();
    const acc = this.accountsRepo.create({
      user: { id: user.userId } as any,
      accountNumber,
      expiresAt,
      cvv,
    });
    return this.accountsRepo.save(acc);
  }

  private generateAccountNumber(): string {
    const min = BigInt(
      this.configService.get<string>('ACCOUNT_NUMBER_MIN') ||
        '4000000000000000',
    );
    const max = BigInt(
      this.configService.get<string>('ACCOUNT_NUMBER_MAX') ||
        '4999999999999999',
    );
    const random =
      BigInt(Math.floor(Math.random() * Number(max - min + 1n))) + min;
    return random.toString();
  }

  private generateExpiryDate(): string {
    const now = new Date();
    const expiry = new Date(now.getFullYear() + 4, now.getMonth());
    const month = String(expiry.getMonth() + 1).padStart(2, '0');
    const year = String(expiry.getFullYear()).slice(-2);
    return `${month}/${year}`;
  }

  private generateCvv(): string {
    return String(Math.floor(Math.random() * 900) + 100);
  }
}
