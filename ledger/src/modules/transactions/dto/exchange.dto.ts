import { IsEnum, IsNumber, IsPositive, Min } from 'class-validator';
import { AccountType } from 'src/utils/enums/account-type.enum';

export class ExchangeDto {
  @IsEnum(AccountType)
  source: AccountType;

  @IsNumber()
  @IsPositive()
  @Min(0.01)
  amount: number;
}
