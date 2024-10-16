import { ICommandHandler } from '@nestjs/cqrs';
import { EmployeeAppointmentService } from '../../employee-appointment.service';
import { EmployeeAppointmentUpdateCommand } from '../employee-appointment.update.command';
import { EmployeeAppointment } from '../../employee-appointment.entity';
import { UpdateResult } from 'typeorm';
import { EmployeeService } from '../../../employee/employee.service';
import { OrganizationService } from '../../../organization/organization.service';
export declare class EmployeeAppointmentUpdateHandler implements ICommandHandler<EmployeeAppointmentUpdateCommand> {
    private employeeAppointmentService;
    private employeeService;
    private organizationService;
    constructor(employeeAppointmentService: EmployeeAppointmentService, employeeService: EmployeeService, organizationService: OrganizationService);
    execute(command?: EmployeeAppointmentUpdateCommand): Promise<UpdateResult | EmployeeAppointment>;
}
