import { ICommand } from '@nestjs/cqrs';
import { ITenant } from '../../../../plugins/contracts/dist/index';

export class TenantStatusBulkCreateCommand implements ICommand {
	static readonly type = '[Tenant Status] Bulk Create';

	constructor(
		public readonly tenants: ITenant[]
	) { }
}
