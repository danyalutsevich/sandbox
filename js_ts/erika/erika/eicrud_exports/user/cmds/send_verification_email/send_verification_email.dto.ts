import { ISendVerificationEmailDto } from '@eicrud/shared/interfaces';

export class SendVerificationEmailDto implements ISendVerificationEmailDto {
  newEmail: string;

  password: string;
}
