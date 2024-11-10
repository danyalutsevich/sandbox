import { ISendPasswordResetEmailDto } from '@eicrud/shared/interfaces';

export class SendPasswordResetEmailDto implements ISendPasswordResetEmailDto {
  email: string;
}
