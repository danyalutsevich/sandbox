import { IProductOptionGroupTranslatable } from '../../plugins/contracts/dist/index';
import { Product, ProductOption, ProductOptionGroupTranslation, TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class ProductOptionGroup extends TenantOrganizationBaseEntity implements IProductOptionGroupTranslatable {
    name: string;
    /**
     * Product
     */
    product: Product;
    productId: string;
    /**
     * ProductOption
     */
    options: ProductOption[];
    /**
     * ProductOptionGroupTranslation
     */
    translations: ProductOptionGroupTranslation[];
}
