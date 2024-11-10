import { ICommand } from '@nestjs/cqrs';
import { IEmployeeAppointmentUpdateInput } from '../../../plugins/contracts';
export declare class EmployeeAppointmentUpdateCommand implements ICommand {
    readonly id: string;
    readonly employeeAppointmentUpdateRequest: IEmployeeAppointmentUpdateInput;
    static readonly type = "[EmployeeAppointment] Update";
    constructor(id: string, employeeAppointmentUpdateRequest: IEmployeeAppointmentUpdateInput);
}
