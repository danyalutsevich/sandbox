import { IsNumber } from 'class-validator';

export class IdObjectDto {
  @IsNumber()
  id: number;

  // allow extra properties
  [key: string]: any;
}
