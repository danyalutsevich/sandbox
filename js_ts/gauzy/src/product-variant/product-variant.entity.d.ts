import { IProductVariant, IProductTranslatable, IProductVariantPrice, IProductVariantSetting, IProductOptionTranslatable, IWarehouseProductVariant } from '../../plugins/contracts/dist/index';
import { ImageAsset, TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class ProductVariant extends TenantOrganizationBaseEntity implements IProductVariant {
    taxes: number;
    notes: string;
    quantity: number;
    billingInvoicingPolicy: string;
    internalReference: string;
    enabled: boolean;
    /**
     * ProductVariantPrice
     */
    price: IProductVariantPrice;
    /**
     * ProductVariantSetting
     */
    setting: IProductVariantSetting;
    /**
     * Product
     */
    product?: IProductTranslatable;
    productId?: string;
    /**
     * ImageAsset
     */
    image?: ImageAsset;
    imageId?: string;
    /**
     * ProductOption
     */
    warehouseProductVariants?: IWarehouseProductVariant[];
    /**
     * ProductOption
     */
    options: IProductOptionTranslatable[];
}
