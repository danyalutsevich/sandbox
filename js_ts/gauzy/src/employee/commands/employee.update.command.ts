import { ICommand } from '@nestjs/cqrs';
import { IEmployee, IEmployeeUpdateInput } from '../../../plugins/contracts';

export class EmployeeUpdateCommand implements ICommand {
	static readonly type = '[Employee] Update';

	constructor(
		public readonly id: IEmployee['id'],
		public readonly input: IEmployeeUpdateInput,
	) { }
}
