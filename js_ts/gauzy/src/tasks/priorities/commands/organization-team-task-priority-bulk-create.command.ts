import { ICommand } from '@nestjs/cqrs';
import { IOrganizationTeam } from '../../../../plugins/contracts/dist/index';

export class OrganizationTeamTaskPriorityBulkCreateCommand implements ICommand {
	static readonly type = '[Organization Team] Task Priority Bulk Create';

	constructor(
		public readonly input: IOrganizationTeam
	) { }
}
