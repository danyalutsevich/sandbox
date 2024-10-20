import { ICommand } from '@nestjs/cqrs';
import { ITimeLog } from '../../../../plugins/contracts/dist/index';

export class GetTimeLogGroupByProjectCommand implements ICommand {
	static readonly type = '[TimeLog] group by project';

	constructor(public readonly timeLogs: ITimeLog[], public readonly timeZone: string) {}
}
