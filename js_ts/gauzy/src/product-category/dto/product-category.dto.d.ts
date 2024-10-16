import { IImageAsset } from '../../../plugins/contracts';
import { Product, ProductCategoryTranslation } from "./../../core/entities/internal";
import { TranslatableBaseDTO } from "./../../core/dto";
export declare class ProductCategoryDTO extends TranslatableBaseDTO<ProductCategoryTranslation[]> {
    readonly imageId?: IImageAsset['id'];
    readonly imageUrl: string;
    readonly products: Product[];
}
