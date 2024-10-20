import { ICommand } from '@nestjs/cqrs';
import { IOrganizationContact, IOrganizationContactUpdateInput } from '../../../plugins/contracts';

export class OrganizationContactUpdateCommand implements ICommand {
	static readonly type = '[Organization Contact] Update';

	constructor(
		public readonly id: IOrganizationContact['id'],
		public readonly input: IOrganizationContactUpdateInput,
	) {}
}