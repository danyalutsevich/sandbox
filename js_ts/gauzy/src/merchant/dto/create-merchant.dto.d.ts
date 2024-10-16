import { IMerchant } from '../../../plugins/contracts';
import { RelationalWarehouseDTO } from "./../../warehouse/dto";
import { RelationalContactDTO } from "./../../contact/dto";
import { MerchantDTO } from "./merchant.dto";
declare const CreateMerchantDTO_base: import("@nestjs/mapped-types").MappedType<RelationalContactDTO & RelationalWarehouseDTO & MerchantDTO>;
/**
 * Create merchant request DTO validation
 */
export declare class CreateMerchantDTO extends CreateMerchantDTO_base implements IMerchant {
}
export {};
