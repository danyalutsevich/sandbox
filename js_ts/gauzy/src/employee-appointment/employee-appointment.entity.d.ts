import { IEmployee, IEmployeeAppointment } from '../../plugins/contracts/dist/index';
import { AppointmentEmployee, TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class EmployeeAppointment extends TenantOrganizationBaseEntity implements IEmployeeAppointment {
    agenda: string;
    description?: string;
    location?: string;
    startDateTime: Date;
    endDateTime: Date;
    bufferTimeStart?: Boolean;
    bufferTimeEnd?: Boolean;
    bufferTimeInMins?: Number;
    breakTimeInMins?: Number;
    breakStartTime?: Date;
    emails?: string;
    status?: string;
    /**
     *
     */
    employee?: IEmployee;
    employeeId?: IEmployee['id'];
    /**
     *
     */
    invitees?: AppointmentEmployee[];
}
