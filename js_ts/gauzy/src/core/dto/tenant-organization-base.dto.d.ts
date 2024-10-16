import { IOrganization, IBasePerTenantAndOrganizationEntityModel } from '../../../plugins/contracts';
import { TenantBaseDTO } from './tenant-base.dto';
export declare class TenantOrganizationBaseDTO extends TenantBaseDTO implements IBasePerTenantAndOrganizationEntityModel {
    readonly organization: IOrganization;
    readonly organizationId: IOrganization['id'];
    readonly sentTo?: IOrganization['id'];
}
