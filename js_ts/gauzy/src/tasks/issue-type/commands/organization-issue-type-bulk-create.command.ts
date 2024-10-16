import { ICommand } from '@nestjs/cqrs';
import { IOrganization } from '../../../../plugins/contracts/dist/index';

export class OrganizationIssueTypeBulkCreateCommand implements ICommand {
	static readonly type = '[Organization] Issue Type Bulk Create';

	constructor(public readonly input: IOrganization) {}
}
