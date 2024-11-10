import { IChangePasswordDto } from '@eicrud/shared/interfaces';

export class ChangePasswordDto implements IChangePasswordDto {
  logMeIn: boolean;

  oldPassword: string;

  newPassword: string;

  expiresInSec: number;
}
