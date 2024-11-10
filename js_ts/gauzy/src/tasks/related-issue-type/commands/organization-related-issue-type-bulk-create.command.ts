import { ICommand } from '@nestjs/cqrs';
import { IOrganization } from '../../../../plugins/contracts/dist/index';

export class OrganizationRelatedIssueTypeBulkCreateCommand implements ICommand {
	static readonly type = '[Organization RelatedIssueType] Bulk Create';

	constructor(public readonly input: IOrganization) {}
}
