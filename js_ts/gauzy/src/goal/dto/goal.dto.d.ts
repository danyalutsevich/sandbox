import { IEmployee, IOrganizationTeam } from '../../../plugins/contracts';
export declare abstract class GoalDTO {
    readonly name: string;
    readonly description: string;
    readonly deadline: string;
    readonly level: string;
    readonly progress: number;
    readonly ownerTeam: IOrganizationTeam;
    readonly ownerTeamId: string;
    readonly ownerEmployee: IEmployee;
    readonly ownerEmployeeId: string;
    readonly lead: IEmployee;
    readonly leadId: string;
}
