import { ICommand } from '@nestjs/cqrs';
import { IOrganization, IOrganizationUpdateInput } from '../../../plugins/contracts';

export class OrganizationUpdateCommand implements ICommand {
	static readonly type = '[Organization] Update';

	constructor(
		public readonly id: IOrganization['id'],
		public readonly input: IOrganizationUpdateInput
	) { }
}
