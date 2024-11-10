import { IGoalGeneralSetting } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class GoalGeneralSetting extends TenantOrganizationBaseEntity implements IGoalGeneralSetting {
    maxObjectives: number;
    maxKeyResults: number;
    employeeCanCreateObjective: boolean;
    canOwnObjectives: string;
    canOwnKeyResult: string;
    krTypeKPI: boolean;
    krTypeTask: boolean;
}
