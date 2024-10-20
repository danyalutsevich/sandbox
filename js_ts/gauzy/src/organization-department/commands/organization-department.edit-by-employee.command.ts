import { ICommand } from '@nestjs/cqrs';
import { IEditEntityByMemberInput as IOrganizationDepartmentEditByEmployeeInput } from '../../../plugins/contracts';

export class OrganizationDepartmentEditByEmployeeCommand implements ICommand {
	static readonly type = '[OrganizationDepartment] Edit By Employee';

	constructor(
		public readonly input: IOrganizationDepartmentEditByEmployeeInput
	) {}
}
