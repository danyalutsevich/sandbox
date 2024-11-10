import { ICommand } from '@nestjs/cqrs';
import { ITenant } from '../../../../plugins/contracts/dist/index';

export class TenantRelatedIssueTypeBulkCreateCommand implements ICommand {
	static readonly type = '[Tenant RelatedIssueType] Bulk Create';

	constructor(public readonly tenants: ITenant[]) {}
}
