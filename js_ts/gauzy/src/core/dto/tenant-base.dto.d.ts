import { IBasePerTenantEntityModel, ITenant } from '../../../plugins/contracts';
export declare class TenantBaseDTO implements IBasePerTenantEntityModel {
    readonly tenant: ITenant;
    readonly tenantId: ITenant['id'];
}
