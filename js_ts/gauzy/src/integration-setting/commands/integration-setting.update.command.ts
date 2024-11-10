import { ICommand } from '@nestjs/cqrs';
import { IIntegrationSetting, IIntegrationTenant } from  '../../../plugins/contracts';

export class IntegrationSettingUpdateCommand implements ICommand {
	static readonly type = '[Integration Setting] Update';

	constructor(
		public readonly integrationId: IIntegrationTenant['id'],
		public readonly input: IIntegrationSetting | IIntegrationSetting[],
	) { }
}
