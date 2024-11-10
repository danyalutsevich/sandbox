import { IBasePerTenantAndOrganizationEntityModel } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from "../../core/dto";
declare const DeleteQueryDTO_base: import("@nestjs/common").Type<Pick<TenantOrganizationBaseDTO, "tenantId" | "organizationId">>;
/**
 * Delete query DTO
 *
 */
export declare class DeleteQueryDTO<T> extends DeleteQueryDTO_base implements IBasePerTenantAndOrganizationEntityModel {
}
export {};
