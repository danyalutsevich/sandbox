import { ICreateAccountDto } from '@eicrud/shared/interfaces';

export class CreateAccountDto implements ICreateAccountDto {
  logMeIn?: boolean;

  email: string;

  username?: string;

  password: string;

  role: string;

  //
}
