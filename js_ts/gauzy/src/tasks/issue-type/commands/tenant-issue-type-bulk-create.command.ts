import { ICommand } from '@nestjs/cqrs';
import { ITenant } from '../../../../plugins/contracts/dist/index';

export class TenantIssueTypeBulkCreateCommand implements ICommand {
	static readonly type = '[Tenant] Issue Type Bulk Create';

	constructor(public readonly tenants: ITenant[]) {}
}
