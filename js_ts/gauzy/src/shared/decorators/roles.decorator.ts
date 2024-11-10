import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { ROLES_METADATA } from '../../../plugins/common/dist/index';
import { RolesEnum } from '../../../plugins/contracts';

export const Roles = (...roles: RolesEnum[]): CustomDecorator => SetMetadata(ROLES_METADATA, roles);