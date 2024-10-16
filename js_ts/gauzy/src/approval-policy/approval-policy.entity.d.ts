import { IApprovalPolicy } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class ApprovalPolicy extends TenantOrganizationBaseEntity implements IApprovalPolicy {
    name: string;
    description: string;
    approvalType: string;
}
