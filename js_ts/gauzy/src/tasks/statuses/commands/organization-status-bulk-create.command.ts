import { ICommand } from '@nestjs/cqrs';
import { IOrganization } from '../../../../plugins/contracts/dist/index';

export class OrganizationStatusBulkCreateCommand implements ICommand {
	static readonly type = '[Organization Status] Bulk Create';

	constructor(
		public readonly input: IOrganization
	) {}
}
