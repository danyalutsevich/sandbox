import { IOrganizationTeam, IRequestApproval, IRequestApprovalTeam } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class RequestApprovalTeam extends TenantOrganizationBaseEntity implements IRequestApprovalTeam {
    status: number;
    requestApproval: IRequestApproval;
    requestApprovalId: string;
    team: IOrganizationTeam;
    teamId: string;
}
