import * as dist from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class Warehouse extends TenantOrganizationBaseEntity implements dist.IWarehouse {
    name: string;
    code: string;
    email: string;
    description: string;
    active: boolean;
    /**
     * ImageAsset
     */
    logo?: dist.IImageAsset;
    logoId?: string;
    /**
     * Contact
     */
    contact?: dist.IContact;
    contactId?: dist.IContact['id'];
    /**
     * WarehouseProduct
     */
    products?: dist.IWarehouseProduct[];
    /**
     * Warehouse Tags
     */
    tags?: dist.ITag[];
    /**
     * Merchants
     */
    merchants?: dist.IMerchant[];
}
