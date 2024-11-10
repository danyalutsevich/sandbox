import { IProductVariantPrice } from '../../plugins/contracts/dist/index';
import { ProductVariant, TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class ProductVariantPrice extends TenantOrganizationBaseEntity implements IProductVariantPrice {
    unitCost: number;
    unitCostCurrency: string;
    retailPrice: number;
    retailPriceCurrency: string;
    /**
     * ProductVariant
     */
    productVariant: ProductVariant;
}
