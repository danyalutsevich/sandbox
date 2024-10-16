import * as contracts from '../../../plugins/contracts';
import { RelationalContactDTO } from "./../../contact/dto";
import { RelationalTagDTO } from "./../../tags/dto";
import { TenantOrganizationBaseDTO } from "./../../core/dto";
declare const WarehouseDTO_base: import("@nestjs/mapped-types").MappedType<RelationalTagDTO & TenantOrganizationBaseDTO & RelationalContactDTO>;
/**
 * Warehouse request DTO validation
 */
export declare class WarehouseDTO extends WarehouseDTO_base implements contracts.IWarehouse {
    readonly name: string;
    readonly code: string;
    readonly email: string;
    readonly description: string;
    readonly active: boolean;
    readonly logo: contracts.IImageAsset;
    readonly logoId: contracts.IImageAsset['id'];
}
export {};
