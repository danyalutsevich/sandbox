import { IRequestApproval, IApprovalPolicy, IRequestApprovalEmployee, IRequestApprovalTeam, ITag } from '../../plugins/contracts';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class RequestApproval extends TenantOrganizationBaseEntity implements IRequestApproval {
    name: string;
    status: number;
    createdBy: string;
    createdByName: string;
    min_count: number;
    requestId: string;
    requestType: string;
    /**
    *  ApprovalPolicy
    */
    approvalPolicy: IApprovalPolicy;
    approvalPolicyId: string;
    /**
     * RequestApprovalEmployee
     */
    employeeApprovals?: IRequestApprovalEmployee[];
    /**
     * RequestApprovalTeam
     */
    teamApprovals?: IRequestApprovalTeam[];
    tags?: ITag[];
}
