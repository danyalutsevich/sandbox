import { ICommand } from '@nestjs/cqrs';
import { ITimeLog } from '../../../../plugins/contracts/dist/index';

export class GetTimeLogGroupByEmployeeCommand implements ICommand {
	static readonly type = '[TimeLog] group by employee';

	constructor(public readonly timeLogs: ITimeLog[], public readonly timeZone: string) {}
}
