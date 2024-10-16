import { SetMetadata } from '@nestjs/common';
import { PERMISSIONS_METADATA } from '../../../plugins/common/dist/index';
import { PermissionsEnum } from '../../../plugins/contracts';

export const Permissions = (...permissions: PermissionsEnum[]) => SetMetadata(PERMISSIONS_METADATA, permissions);