import { IProductTypeTranslation } from '../../plugins/contracts/dist/index';
import { ProductType, TranslationBase } from '../core/entities/internal';
export declare class ProductTypeTranslation extends TranslationBase implements IProductTypeTranslation {
    name: string;
    description: string;
    languageCode: string;
    /**
     * ProductType
     */
    reference: ProductType;
    referenceId: string;
}
