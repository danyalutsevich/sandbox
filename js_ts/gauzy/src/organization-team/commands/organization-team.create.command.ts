import { ICommand } from '@nestjs/cqrs';
import { IOrganizationTeamCreateInput } from '../../../plugins/contracts';

export class OrganizationTeamCreateCommand implements ICommand {
	static readonly type = '[Organization Team] Create';

	constructor(
		public readonly input: IOrganizationTeamCreateInput
	) { }
}
