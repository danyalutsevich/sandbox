import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const Roles = (roles: string[]): CustomDecorator<unknown> => {
  return SetMetadata<unknown>('roles', roles);
};
