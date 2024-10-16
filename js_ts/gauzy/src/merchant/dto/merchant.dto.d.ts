import { IImageAsset, IMerchant } from '../../../plugins/contracts';
import { RelationalCurrencyDTO } from "./../../currency/dto";
import { TenantOrganizationBaseDTO } from "./../../core/dto";
import { RelationalTagDTO } from "./../../tags/dto";
declare const MerchantDTO_base: import("@nestjs/mapped-types").MappedType<RelationalTagDTO & TenantOrganizationBaseDTO & RelationalCurrencyDTO>;
/**
 * Merchant request DTO validation
 */
export declare class MerchantDTO extends MerchantDTO_base implements IMerchant {
    readonly name: string;
    readonly code: string;
    readonly email: string;
    readonly phone: string;
    readonly description: string;
    readonly active: boolean;
    readonly logo: IImageAsset;
    readonly logoId: IImageAsset['id'];
}
export {};
