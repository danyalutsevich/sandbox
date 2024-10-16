import { IVerifyTokenDto } from '@eicrud/shared/interfaces';

export class VerifyEmailDto implements IVerifyTokenDto {
  logMeIn: boolean;

  token_id: string;
}
