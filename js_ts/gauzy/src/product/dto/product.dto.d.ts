import { IImageAsset, IProduct, IProductCategoryTranslatable, IProductTypeTranslatable, IProductVariant, ITag } from '../../../plugins/contracts';
export declare abstract class ProductDTO implements IProduct {
    readonly name: string;
    readonly description: string;
    readonly enabled: boolean;
    readonly code: string;
    readonly imageUrl: string;
    readonly featuredImage: IImageAsset;
    readonly variants: IProductVariant[];
    readonly productTypeId: string;
    readonly productCategoryId: string;
    readonly productType: IProductTypeTranslatable;
    readonly productCategory: IProductCategoryTranslatable;
    readonly tags: ITag[];
}
