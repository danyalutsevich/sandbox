import { IEmployeeSetting, IEmployee } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class EmployeeSetting extends TenantOrganizationBaseEntity implements IEmployeeSetting {
    month: number;
    year: number;
    settingType: string;
    value: number;
    currency: string;
    employee: IEmployee;
    employeeId: string;
}
