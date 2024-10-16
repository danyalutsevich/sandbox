import { ICommand } from '@nestjs/cqrs';
import { ITenant } from '../../../../plugins/contracts/dist/index';

export class TenantVersionBulkCreateCommand implements ICommand {
	static readonly type = '[Tenant Version] Bulk Create';

	constructor(public readonly tenants: ITenant[]) {}
}
