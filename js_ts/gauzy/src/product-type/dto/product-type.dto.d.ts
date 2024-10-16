import { ProductTypesIconsEnum } from '../../../plugins/contracts';
import { Product, ProductTypeTranslation } from "./../../core/entities/internal";
import { TranslatableBaseDTO } from "./../../core/dto";
export declare class ProductTypeDTO extends TranslatableBaseDTO<ProductTypeTranslation[]> {
    readonly icon: ProductTypesIconsEnum;
    readonly products: Product[];
}
