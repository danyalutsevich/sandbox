import { IOrganizationVendorCreateInput, IOrganizationVendorFindInput } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';

export class OrganizationVendorFirstOrCreateCommand implements ICommand {
	static readonly type = '[OrganizationVendor] First Or Create';

	constructor(
		public readonly input: IOrganizationVendorCreateInput | IOrganizationVendorFindInput
	) {}
}
