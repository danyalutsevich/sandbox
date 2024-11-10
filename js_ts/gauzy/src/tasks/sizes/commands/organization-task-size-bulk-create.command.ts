import { ICommand } from '@nestjs/cqrs';
import { IOrganization } from '../../../../plugins/contracts/dist/index';

export class OrganizationTaskSizeBulkCreateCommand implements ICommand {
	static readonly type = '[Organization] Task Size Bulk Create';

	constructor(
		public readonly input: IOrganization
	) { }
}
