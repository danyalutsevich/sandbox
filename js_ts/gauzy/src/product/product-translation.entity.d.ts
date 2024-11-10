import { IProduct, IProductTranslation } from '../../plugins/contracts/dist/index';
import { TranslationBase } from '../core/entities/internal';
export declare class ProductTranslation extends TranslationBase implements IProductTranslation {
    name: string;
    description: string;
    languageCode: string;
    /**
     * Product
     */
    reference: IProduct;
    referenceId: string;
}
