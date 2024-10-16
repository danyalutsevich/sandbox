import { IGoal, IKeyResult, IOrganizationTeam, IEmployee } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class Goal extends TenantOrganizationBaseEntity implements IGoal {
    name: string;
    description?: string;
    deadline: string;
    level: string;
    progress: number;
    /**
     * OrganizationTeam
     */
    ownerTeam?: IOrganizationTeam;
    ownerTeamId?: string;
    /**
     * Owner Employee
     */
    ownerEmployee?: IEmployee;
    ownerEmployeeId?: string;
    /**
     * Lead Employee
     */
    lead?: IEmployee;
    leadId?: string;
    /**
     * KeyResult
     */
    alignedKeyResult?: IKeyResult;
    alignedKeyResultId?: string;
    /**
     * KeyResult
     */
    keyResults?: IKeyResult[];
}
