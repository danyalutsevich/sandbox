import { Controller, UseGuards } from '@nestjs/common';
import { PermissionsEnum } from  '../../plugins/contracts/dist/index';
import { Permissions } from './../shared/decorators';
import { PermissionGuard, TenantPermissionGuard } from './../shared/guards';

@UseGuards(TenantPermissionGuard, PermissionGuard)
@Permissions(PermissionsEnum.INTEGRATION_VIEW)
@Controller()
export class IntegrationMapController {
	constructor() { }
}
