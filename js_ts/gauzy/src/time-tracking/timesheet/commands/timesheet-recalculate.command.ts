import { ICommand } from '@nestjs/cqrs';
import { ITimesheet } from '../../../../plugins/contracts/dist/index';

export class TimesheetRecalculateCommand implements ICommand {
	static readonly type = '[Timesheet] Recalculate';

	constructor(
		public readonly id: ITimesheet['id']
	) { }
}
