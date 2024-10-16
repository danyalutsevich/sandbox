import { IResetPasswordDto } from '@eicrud/shared/interfaces';

export class ResetPasswordDto implements IResetPasswordDto {
  logMeIn: boolean;

  token_id: string;

  newPassword: string;

  expiresInSec: number;
}
