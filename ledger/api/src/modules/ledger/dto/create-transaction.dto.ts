import { IsNumber, IsObject, IsString, Min } from 'class-validator';

export class CreateTransactionDto {
  @IsObject()
  sender: {
    accountId: number;
    userId: string;
  };

  @IsObject()
  receiver: {
    accountId: number;
  };

  @IsString()
  description: string;

  @Min(0)
  @IsNumber({ maxDecimalPlaces: 0 })
  amount: number;
}
