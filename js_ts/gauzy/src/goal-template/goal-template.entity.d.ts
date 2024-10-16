import { IGoalTemplate, IKeyResultTemplate } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class GoalTemplate extends TenantOrganizationBaseEntity implements IGoalTemplate {
    name: string;
    level: string;
    category: string;
    keyResults?: IKeyResultTemplate[];
}
