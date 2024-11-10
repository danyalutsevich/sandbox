import { ICommand } from '@nestjs/cqrs';
import { ITenant } from '../../../../plugins/contracts/dist/index';

export class TenantTaskSizeBulkCreateCommand implements ICommand {
	static readonly type = '[Tenant] Task Size Bulk Create';

	constructor(
		public readonly tenants: ITenant[]
	) { }
}
