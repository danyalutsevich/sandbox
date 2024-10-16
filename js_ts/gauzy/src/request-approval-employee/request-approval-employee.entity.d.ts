import { IEmployee, IRequestApproval, IRequestApprovalEmployee } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class RequestApprovalEmployee extends TenantOrganizationBaseEntity implements IRequestApprovalEmployee {
    status: number;
    requestApproval: IRequestApproval;
    requestApprovalId: string;
    employee: IEmployee;
    employeeId: string;
}
