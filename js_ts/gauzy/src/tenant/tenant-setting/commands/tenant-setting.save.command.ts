import { ICommand } from '@nestjs/cqrs';
import { ITenantSetting } from '../../../../plugins/contracts/dist/index';

export class TenantSettingSaveCommand implements ICommand {
	static readonly type = '[Tenant] Setting Save';

	constructor(
		public readonly input: ITenantSetting,
		public readonly tenantId?: string
	) {}
}
