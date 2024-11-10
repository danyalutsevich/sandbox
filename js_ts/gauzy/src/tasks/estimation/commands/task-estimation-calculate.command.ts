import { ICommand } from '@nestjs/cqrs';
import { ITask } from '../../../../plugins/contracts/dist/index';

export class TaskEstimationCalculateCommand implements ICommand {
	static readonly type = '[Task Estimation] Calculate Task Estimation';

	constructor(public readonly id: ITask['id']) {}
}
