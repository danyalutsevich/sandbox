import { IImageAsset, IProductCategoryTranslatable } from '../../plugins/contracts/dist/index';
import { ImageAsset, Product, ProductCategoryTranslation, TranslatableBase } from '../core/entities/internal';
export declare class ProductCategory extends TranslatableBase implements IProductCategoryTranslatable {
    imageUrl: string;
    /**
     * ImageAsset
     */
    image?: ImageAsset;
    imageId?: IImageAsset['id'];
    /**
     * Product
     */
    products: Product[];
    /**
     * ProductCategoryTranslation
     */
    translations: ProductCategoryTranslation[];
}
