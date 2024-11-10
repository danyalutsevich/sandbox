import { IIntegrationTenantFindInput } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from '../../core/dto';
import { RelationsQueryDTO } from '../../shared/dto';
import { IntegrationTenant } from '../integration-tenant.entity';
declare const IntegrationTenantQueryDTO_base: import("@nestjs/common").Type<TenantOrganizationBaseDTO & RelationsQueryDTO & Pick<IntegrationTenant, "name">>;
export declare class IntegrationTenantQueryDTO extends IntegrationTenantQueryDTO_base implements IIntegrationTenantFindInput {
}
export {};
