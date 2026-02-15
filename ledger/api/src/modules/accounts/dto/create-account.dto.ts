import { AccountType } from 'src/utils/enums/account-type.enum';
import { IsEnum, Min } from 'class-validator';

export class CreateAccountDto {
  @IsEnum(AccountType)
  type: AccountType;

  @Min(0)
  initialBalance: number;
}
