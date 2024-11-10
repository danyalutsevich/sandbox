import { ICommand } from '@nestjs/cqrs';
import { IEditEntityByMemberInput as IOrganizationProjectEditByEmployeeInput } from '../../../plugins/contracts';

export class OrganizationProjectEditByEmployeeCommand implements ICommand {
	static readonly type = '[OrganizationProject] Edit By Employee';

	constructor(
		public readonly input: IOrganizationProjectEditByEmployeeInput
	) {}
}
