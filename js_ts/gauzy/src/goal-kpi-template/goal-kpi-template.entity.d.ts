import { IGoalKPITemplate, IEmployee } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class GoalKPITemplate extends TenantOrganizationBaseEntity implements IGoalKPITemplate {
    name: string;
    description: string;
    type: string;
    unit?: string;
    operator: string;
    lead?: IEmployee;
    currentValue?: number;
    targetValue?: number;
}
