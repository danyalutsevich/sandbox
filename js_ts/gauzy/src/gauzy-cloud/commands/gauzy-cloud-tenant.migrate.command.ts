import { ICommand } from '@nestjs/cqrs';
import { ITenantCreateInput } from '../../../plugins/contracts';

export class GauzyCloudTenantMigrateCommand implements ICommand {
	static readonly type = '[Gauzy Cloud] Tenant Migrate';

	constructor(
		public readonly input: ITenantCreateInput,
		public readonly token: string
	) {}
}
