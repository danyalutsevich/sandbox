import { ICommand } from '@nestjs/cqrs';
import { IDateRange, ITimeSlot } from '../../../../plugins/contracts/dist/index';
import { TimeLog } from '../time-log.entity';

export class DeleteTimeSpanCommand implements ICommand {
	static readonly type = '[TimeLog] delete time span';

	constructor(
		public readonly newTime: IDateRange,
		public readonly timeLog: TimeLog,
		public readonly timeSlot: ITimeSlot
	) {}
}
