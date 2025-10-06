import { IsEnum, IsNumber, IsPositive, IsString, Min } from 'class-validator';
import { AccountType } from 'src/utils/enums/account-type.enum';

export class TransferDto {
  @IsString()
  recipientUsername: string;

  @IsEnum(AccountType)
  currency: AccountType;

  @IsNumber()
  @IsPositive()
  @Min(0.01)
  amount: number;
}
