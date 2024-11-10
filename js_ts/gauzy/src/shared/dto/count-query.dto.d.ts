import { IBasePerTenantAndOrganizationEntityModel, IOrganization } from '../../../plugins/contracts';
import { TenantBaseDTO } from "./../../core/dto";
declare const CountQueryDTO_base: import("@nestjs/common").Type<Pick<TenantBaseDTO, "tenantId">>;
/**
 * Entity Count DTO
 *
 */
export declare class CountQueryDTO<T> extends CountQueryDTO_base implements IBasePerTenantAndOrganizationEntityModel {
    readonly organizationId: IOrganization['id'];
}
export {};
