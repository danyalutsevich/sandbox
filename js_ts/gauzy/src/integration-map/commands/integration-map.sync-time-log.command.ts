import { ICommand } from '@nestjs/cqrs';
import { IIntegrationMapSyncEntity, ITimeLog } from  '../../../plugins/contracts';

export class IntegrationMapSyncTimeLogCommand implements ICommand {
	static readonly type = '[Integration Map] Sync TimeLog';

	constructor(
		public readonly input: IIntegrationMapSyncEntity<Partial<ITimeLog>>
	) { }
}
