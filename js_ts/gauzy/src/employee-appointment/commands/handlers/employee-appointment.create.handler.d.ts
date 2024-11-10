import { ICommandHandler } from '@nestjs/cqrs';
import { EmployeeAppointmentService } from '../../employee-appointment.service';
import { EmployeeAppointmentCreateCommand } from '../employee-appointment.create.command';
import { EmployeeAppointment } from '../../employee-appointment.entity';
import { EmailService } from './../../../email-send/email.service';
import { EmployeeService } from '../../../employee/employee.service';
import { OrganizationService } from '../../../organization/organization.service';
export declare class EmployeeAppointmentCreateHandler implements ICommandHandler<EmployeeAppointmentCreateCommand> {
    private readonly employeeAppointmentService;
    private readonly emailService;
    private readonly employeeService;
    private readonly organizationService;
    constructor(employeeAppointmentService: EmployeeAppointmentService, emailService: EmailService, employeeService: EmployeeService, organizationService: OrganizationService);
    execute(command?: EmployeeAppointmentCreateCommand): Promise<EmployeeAppointment>;
    private _sendAppointmentEmail;
}
