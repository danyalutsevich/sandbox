import { IKeyResult, IEmployee, IGoal, IOrganizationProject, ITask, IKPI } from '../../plugins/contracts/dist/index';
import { KeyResultUpdate, TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class KeyResult extends TenantOrganizationBaseEntity implements IKeyResult {
    name: string;
    description?: string;
    type: string;
    targetValue?: number;
    initialValue: number;
    unit?: string;
    update: number;
    progress: number;
    deadline: string;
    hardDeadline?: Date;
    softDeadline?: Date;
    status?: string;
    weight?: string;
    /**
     * Owner Employee
     */
    owner: IEmployee;
    ownerId: string;
    /**
     * Lead Employee
     */
    lead?: IEmployee;
    leadId?: string;
    /**
     * Organization Project
     */
    project?: IOrganizationProject;
    readonly projectId?: string;
    /**
     * Task
     */
    task?: ITask;
    readonly taskId?: string;
    /**
     * GoalKPI
     */
    kpi?: IKPI;
    readonly kpiId?: string;
    /**
     * Goal
     */
    goal: IGoal;
    readonly goalId?: string;
    updates?: KeyResultUpdate[];
}
