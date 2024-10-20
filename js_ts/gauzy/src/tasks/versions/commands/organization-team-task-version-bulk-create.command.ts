import { ICommand } from '@nestjs/cqrs';
import { IOrganizationTeam } from '../../../../plugins/contracts/dist/index';

export class OrganizationTeamTaskVersionBulkCreateCommand implements ICommand {
	static readonly type = '[Organization Team] Task Version Bulk Create';

	constructor(public readonly input: IOrganizationTeam) {}
}
