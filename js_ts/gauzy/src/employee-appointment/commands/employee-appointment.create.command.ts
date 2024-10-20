import { ICommand } from '@nestjs/cqrs';
import {
	LanguagesEnum,
	IEmployeeAppointmentCreateInput
} from '../../../plugins/contracts';

export class EmployeeAppointmentCreateCommand implements ICommand {
	static readonly type = '[EmployeeAppointment] Register';

	constructor(
		public readonly employeeAppointmentInput: IEmployeeAppointmentCreateInput,
		public readonly languageCode: LanguagesEnum
	) {}
}
