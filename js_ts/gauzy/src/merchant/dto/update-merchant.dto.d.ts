import { IMerchant } from '../../../plugins/contracts';
import { RelationalWarehouseDTO } from "./../../warehouse/dto";
import { RelationalContactDTO } from "./../../contact/dto";
import { MerchantDTO } from "./merchant.dto";
declare const UpdateMerchantDTO_base: import("@nestjs/mapped-types").MappedType<RelationalContactDTO & RelationalWarehouseDTO & MerchantDTO>;
/**
 * Update merchant request DTO validation
 */
export declare class UpdateMerchantDTO extends UpdateMerchantDTO_base implements IMerchant {
}
export {};
