import { IOrganizationPosition, ITag } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class OrganizationPosition extends TenantOrganizationBaseEntity implements IOrganizationPosition {
    name: string;
    tags?: ITag[];
}
