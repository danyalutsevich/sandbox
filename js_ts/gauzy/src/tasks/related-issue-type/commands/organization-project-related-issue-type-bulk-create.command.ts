import { ICommand } from '@nestjs/cqrs';
import { IOrganizationProject } from '../../../../plugins/contracts/dist/index';

export class OrganizationProjectRelatedIssueTypeBulkCreateCommand
	implements ICommand
{
	static readonly type =
		'[Organization Project] Task RelatedIssueType Bulk Create';

	constructor(public readonly input: IOrganizationProject) {}
}
