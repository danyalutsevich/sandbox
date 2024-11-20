import { IsString, IsOptional } from 'class-validator';

export class SayHelloDto {
  @IsString()
  @IsOptional()
  hello: string;
}

//used by super-client, update me here
export type SayHelloReturnDto = string;
