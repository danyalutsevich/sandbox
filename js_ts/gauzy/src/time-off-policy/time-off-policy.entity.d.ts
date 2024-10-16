import { IEmployee, ITimeOff as ITimeOffRequest, ITimeOffPolicy } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class TimeOffPolicy extends TenantOrganizationBaseEntity implements ITimeOffPolicy {
    name: string;
    requiresApproval: boolean;
    paid: boolean;
    /**
     * TimeOffRequest
     */
    timeOffRequests?: ITimeOffRequest[];
    employees?: IEmployee[];
}
