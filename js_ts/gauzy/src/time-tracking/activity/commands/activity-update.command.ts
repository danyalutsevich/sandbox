import { ICommand } from '@nestjs/cqrs';
import { IActivity } from '../../../../plugins/contracts/dist/index';

export class ActivityUpdateCommand implements ICommand {
	static readonly type = '[Activity] Update';

	constructor(
		public readonly input: IActivity
	) {}
}
