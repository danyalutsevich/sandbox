import { ICommand } from '@nestjs/cqrs';
import { IHubstaffScreenshotActivity, IIntegrationMapSyncEntity } from  '../../../plugins/contracts';

export class IntegrationMapSyncScreenshotCommand implements ICommand {
	static readonly type = '[Integration Map] Sync Screenshot';

	constructor(
		public readonly input: IIntegrationMapSyncEntity<IHubstaffScreenshotActivity>
	) { }
}
