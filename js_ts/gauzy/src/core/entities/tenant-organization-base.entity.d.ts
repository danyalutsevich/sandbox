import { IOrganization, IBasePerTenantAndOrganizationEntityModel } from '../../../plugins/contracts/dist/index';
import { TenantBaseEntity } from '../entities/internal';
export declare abstract class TenantOrganizationBaseEntity extends TenantBaseEntity implements IBasePerTenantAndOrganizationEntityModel {
    organization?: IOrganization;
    organizationId?: IOrganization['id'];
}
