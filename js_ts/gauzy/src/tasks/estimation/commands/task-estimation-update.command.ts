import { ICommand } from '@nestjs/cqrs';
import { ITaskEstimation, ITaskEstimationUpdateInput } from '../../../../plugins/contracts/dist/index';

export class TaskEstimationUpdateCommand implements ICommand {
	static readonly type = '[Task Estimation] Update Task Estimation';

	constructor(
		public readonly id: ITaskEstimation['id'],
		public readonly input: ITaskEstimationUpdateInput
	) {}
}
