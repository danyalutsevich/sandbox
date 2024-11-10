import { ICommand } from '@nestjs/cqrs';
import { IOrganizationTeam } from '../../../../plugins/contracts/dist/index';

export class OrganizationTeamIssueTypeBulkCreateCommand implements ICommand {
	static readonly type = '[Organization Team] Issue Type Bulk Create';

	constructor(public readonly input: IOrganizationTeam) {}
}
