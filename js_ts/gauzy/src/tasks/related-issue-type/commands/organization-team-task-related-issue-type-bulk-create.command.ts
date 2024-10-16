import { ICommand } from '@nestjs/cqrs';
import { IOrganizationTeam } from '../../../../plugins/contracts/dist/index';

export class OrganizationTeamTaskRelatedIssueTypeBulkCreateCommand
	implements ICommand
{
	static readonly type =
		'[Organization Team] Task RelatedIssueType Bulk Create';

	constructor(public readonly input: IOrganizationTeam) {}
}
