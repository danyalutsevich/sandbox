import { IEmployee, IEmployeePhone } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class EmployeePhone extends TenantOrganizationBaseEntity implements IEmployeePhone {
    type: string;
    phoneNumber: string;
    employee?: IEmployee;
    employeeId?: IEmployee['id'];
}
