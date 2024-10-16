import { IEmployee, IKPI } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class GoalKPI extends TenantOrganizationBaseEntity implements IKPI {
    name: string;
    description: string;
    type: string;
    unit?: string;
    operator: string;
    currentValue: number;
    targetValue: number;
    /**
     * Employee
     */
    lead?: IEmployee;
    leadId?: string;
}
