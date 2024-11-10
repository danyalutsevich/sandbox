import { IProductTypeTranslation as IProductCategoryTranslation } from '../../plugins/contracts/dist/index';
import { ProductCategory, TranslationBase } from '../core/entities/internal';
export declare class ProductCategoryTranslation extends TranslationBase implements IProductCategoryTranslation {
    name: string;
    description: string;
    languageCode: string;
    /**
     * ProductCategory
     */
    reference: ProductCategory;
    referenceId: string;
}
