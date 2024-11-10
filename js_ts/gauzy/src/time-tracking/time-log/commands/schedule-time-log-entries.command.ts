import { ICommand } from '@nestjs/cqrs';
import { ITimeLog } from '../../../../plugins/contracts/dist/index';

export class ScheduleTimeLogEntriesCommand implements ICommand {
	static readonly type = 'Adjust [TimeLog] Entries';

	constructor(
		public readonly timeLog?: ITimeLog
	) {}
}