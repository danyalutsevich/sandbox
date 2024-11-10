import { IBasePerTenantEntityModel, ITenant } from '../../../plugins/contracts';
import { BaseEntity } from '../entities/internal';
export declare abstract class TenantBaseEntity extends BaseEntity implements IBasePerTenantEntityModel {
    tenant?: ITenant;
    tenantId?: ITenant['id'];
}
