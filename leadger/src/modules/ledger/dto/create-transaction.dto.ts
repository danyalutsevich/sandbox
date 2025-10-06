import { IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  description: string;

  entries: { accountId: number; amount: string }[];
}
