import { IProductCategoryTranslatable, IProductCreateInput, IProductOptionGroupTranslatable, IProductOptionTranslatable, IProductTranslation, IProductTypeTranslatable } from '../../../plugins/contracts';
import { ProductDTO } from './product.dto';
export declare class CreateProductDTO extends ProductDTO implements IProductCreateInput {
    readonly type: IProductTypeTranslatable;
    readonly category: IProductCategoryTranslatable;
    readonly optionGroupUpdateInputs: IProductOptionGroupTranslatable[];
    readonly optionGroupCreateInputs: IProductOptionGroupTranslatable[];
    readonly optionGroupDeleteInputs: IProductOptionGroupTranslatable[];
    readonly optionDeleteInputs: IProductOptionTranslatable[];
    readonly translations: IProductTranslation[];
    readonly language: string;
}
