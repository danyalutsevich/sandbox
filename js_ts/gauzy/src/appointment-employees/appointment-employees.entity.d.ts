import { IAppointmentEmployee, IEmployee, IEmployeeAppointment } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class AppointmentEmployee extends TenantOrganizationBaseEntity implements IAppointmentEmployee {
    appointmentId: string;
    /**
     * Employee
     */
    employee?: IEmployee;
    employeeId?: string;
    /**
     * EmployeeAppointment
     */
    employeeAppointment?: IEmployeeAppointment;
    employeeAppointmentId?: string;
}
