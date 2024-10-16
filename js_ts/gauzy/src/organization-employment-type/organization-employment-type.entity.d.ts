import { ICandidate, IEmployee, IOrganizationEmploymentType, ITag } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class OrganizationEmploymentType extends TenantOrganizationBaseEntity implements IOrganizationEmploymentType {
    name: string;
    tags?: ITag[];
    /**
     * Employee
     */
    members?: IEmployee[];
    /**
     * Candidate
     */
    candidates?: ICandidate[];
}
