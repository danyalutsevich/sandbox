import { ICommand } from '@nestjs/cqrs';
import { IOrganizationProject } from '../../../../plugins/contracts/dist/index';

export class OrganizationProjectTaskSizeBulkCreateCommand implements ICommand {
	static readonly type = '[Organization Project] Task Size Bulk Create';

	constructor(
		public readonly input: IOrganizationProject
	) { }
}
