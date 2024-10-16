import { IEmployee, IEmployeeAward } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class EmployeeAward extends TenantOrganizationBaseEntity implements IEmployeeAward {
    name: string;
    year: string;
    employee?: IEmployee;
    employeeId?: string;
}
