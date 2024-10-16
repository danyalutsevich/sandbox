import { ICommand } from '@nestjs/cqrs';
import { IIntegrationMapSyncEntity, IOrganizationCreateInput, IOrganizationUpdateInput } from  '../../../plugins/contracts';

export class IntegrationMapSyncOrganizationCommand implements ICommand {
	static readonly type = '[Integration Map] Sync Organization';

	constructor(
		public readonly input: IIntegrationMapSyncEntity<IOrganizationCreateInput | IOrganizationUpdateInput>
	) { }
}
