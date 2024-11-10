import { IOrganizationContact, IOrganizationProject, IOrganizationTeam, ITask, ITimerToggleInput, TimeLogSourceEnum, TimeLogType } from '../../../../plugins/contracts/dist/index';
import { TenantOrganizationBaseDTO } from "./../../../core/dto";
export declare class StartTimerDTO extends TenantOrganizationBaseDTO implements ITimerToggleInput {
    readonly logType: TimeLogType;
    readonly source: TimeLogSourceEnum;
    readonly isBillable: boolean;
    readonly description: string;
    readonly projectId: IOrganizationProject['id'];
    readonly taskId: ITask['id'];
    readonly organizationContactId: IOrganizationContact['id'];
    readonly organizationTeamId: IOrganizationTeam['id'];
    /**
     * Version of the sources (Desktop/Web/Browser/Mobile) timer
     */
    readonly version: string;
}
