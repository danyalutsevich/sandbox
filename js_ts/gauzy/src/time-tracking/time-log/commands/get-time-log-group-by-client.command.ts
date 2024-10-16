import { ICommand } from '@nestjs/cqrs';
import { ITimeLog } from '../../../../plugins/contracts/dist/index';

export class GetTimeLogGroupByClientCommand implements ICommand {
	static readonly type = '[TimeLog] group by client';

	constructor(public readonly timeLogs: ITimeLog[], public readonly timeZone: string) {}
}
