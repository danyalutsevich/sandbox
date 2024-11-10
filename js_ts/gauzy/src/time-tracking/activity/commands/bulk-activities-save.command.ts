import { IBulkActivitiesInput } from '../../../../plugins/contracts/dist/index';
import { ICommand } from '@nestjs/cqrs';

export class BulkActivitiesSaveCommand implements ICommand {
	static readonly type = '[Activity] Bulk Create Activities';

	constructor(
		public readonly input: IBulkActivitiesInput
	) { }
}
