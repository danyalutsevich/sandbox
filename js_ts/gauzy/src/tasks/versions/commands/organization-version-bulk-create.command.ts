import { ICommand } from '@nestjs/cqrs';
import { IOrganization } from '../../../../plugins/contracts/dist/index';

export class OrganizationVersionBulkCreateCommand implements ICommand {
	static readonly type = '[Organization Version] Bulk Create';

	constructor(public readonly input: IOrganization) {}
}
