import { ICommand } from '@nestjs/cqrs';
import { ITaskEstimationCreateInput } from '../../../../plugins/contracts/dist/index';

export class TaskEstimationCreateCommand implements ICommand {
	static readonly type = '[Task Estimation] Create Task Estimation';

	constructor(public readonly input: ITaskEstimationCreateInput) {}
}
