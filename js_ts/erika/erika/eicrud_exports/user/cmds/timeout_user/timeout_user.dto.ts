import { ITimeoutUserDto } from '@eicrud/shared/interfaces';

export class TimeoutUserDto implements ITimeoutUserDto {
  userId: string;

  timeoutDurationMinutes: number;

  allowedRoles: string[];
}
