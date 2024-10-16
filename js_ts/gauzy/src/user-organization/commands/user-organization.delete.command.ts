import { ICommand } from '@nestjs/cqrs';
import { IUserOrganizationDeleteInput } from '../../../plugins/contracts';

export class UserOrganizationDeleteCommand implements ICommand {
	static readonly type = '[UserOrganization] Delete';

	constructor(public readonly input: IUserOrganizationDeleteInput) {}
}
