import { CustomDecorator } from '@nestjs/common';
import { RolesEnum } from '../../../plugins/contracts';
export declare const Roles: (...roles: RolesEnum[]) => CustomDecorator;
