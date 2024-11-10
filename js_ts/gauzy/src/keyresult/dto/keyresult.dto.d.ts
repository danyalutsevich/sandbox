import { IEmployee, IGoal, IKPI, IOrganizationProject, ITask } from '../../../plugins/contracts';
import { KeyResultUpdate } from "core";
export declare abstract class KeyresultDTO {
    readonly name: string;
    readonly description: string;
    readonly type: string;
    readonly targetValue: number;
    readonly initialValue: number;
    readonly unit: string;
    readonly update: number;
    readonly progress: number;
    readonly deadline: string;
    readonly hardDeadline: Date;
    readonly softDeadline: Date;
    readonly status: string;
    readonly weight: string;
    readonly ownerId: string;
    readonly owner: IEmployee;
    readonly lead: IEmployee;
    readonly leadId: string;
    readonly project: IOrganizationProject;
    readonly projectId: string;
    readonly task: ITask;
    readonly kpi: IKPI;
    readonly kpiId: string;
    readonly goal: IGoal;
    readonly goalId: string;
    readonly updates: KeyResultUpdate[];
}
