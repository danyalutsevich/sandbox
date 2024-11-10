import { ILoginDto, LoginResponseDto } from '@eicrud/shared/interfaces';

//@eicrud:cli:export:skip-superclient
export class LoginDto implements ILoginDto {
  email: string;

  password: string;

  twoFA_code?: string;

  expiresInSec?: number;
}

export class LoginReturnDto implements LoginResponseDto {
  userId: string;
  accessToken?: string;
  refreshTokenSec?: number;
}
