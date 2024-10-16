import { IMerchant, CurrenciesEnum, IImageAsset, ITag, IWarehouse, IContact } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class Merchant extends TenantOrganizationBaseEntity implements IMerchant {
    name: string;
    code: string;
    email: string;
    phone: string;
    description: string;
    active: boolean;
    currency: CurrenciesEnum;
    /**
     * Contact
     */
    contact?: IContact;
    contactId?: IContact['id'];
    /**
     * ImageAsset
     */
    logo?: IImageAsset;
    logoId?: IImageAsset['id'];
    /**
     * Tag
     */
    tags?: ITag[];
    /**
     * Warehouses
     */
    warehouses?: IWarehouse[];
}
