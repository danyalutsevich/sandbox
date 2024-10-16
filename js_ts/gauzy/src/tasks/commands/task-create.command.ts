import { ICommand } from '@nestjs/cqrs';
import { ITaskCreateInput } from '../../../plugins/contracts';

export class TaskCreateCommand implements ICommand {
	static readonly type = '[Tasks] Create Task';

	constructor(
		public readonly input: ITaskCreateInput,
		public readonly triggeredEvent: boolean = true // Enabled the "2 Way Sync Triggered Event" Synchronization
	) { }
}
