import { IOrganizationAward } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class OrganizationAward extends TenantOrganizationBaseEntity implements IOrganizationAward {
    name: string;
    year: string;
}
