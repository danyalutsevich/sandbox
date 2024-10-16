import { ICommand } from '@nestjs/cqrs';
import { LanguagesEnum, IEmployeeAppointmentCreateInput } from '../../../plugins/contracts';
export declare class EmployeeAppointmentCreateCommand implements ICommand {
    readonly employeeAppointmentInput: IEmployeeAppointmentCreateInput;
    readonly languageCode: LanguagesEnum;
    static readonly type = "[EmployeeAppointment] Register";
    constructor(employeeAppointmentInput: IEmployeeAppointmentCreateInput, languageCode: LanguagesEnum);
}
