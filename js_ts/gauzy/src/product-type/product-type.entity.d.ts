import { Product, ProductTypeTranslation, TranslatableBase } from '../core/entities/internal';
export declare class ProductType extends TranslatableBase {
    icon: string;
    /**
     * Product
     */
    products: Product[];
    /**
     * ProductTypeTranslation
     */
    translations: ProductTypeTranslation[];
}
