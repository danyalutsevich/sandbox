import { IGoalTimeFrame } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class GoalTimeFrame extends TenantOrganizationBaseEntity implements IGoalTimeFrame {
    name: string;
    status: string;
    startDate: Date;
    endDate: Date;
}
