import { ICommand } from '@nestjs/cqrs';
import { ISubmitTimesheetInput } from '../../../../plugins/contracts/dist/index';

export class TimesheetSubmitCommand implements ICommand {
	static readonly type = '[Timesheet] Submit';

	constructor(
		public readonly input: ISubmitTimesheetInput
	) {}
}
