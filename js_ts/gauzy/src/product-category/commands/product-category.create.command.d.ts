import { ICommand } from '@nestjs/cqrs';
import { IProductCategoryTranslatable, LanguagesEnum } from '../../../plugins/contracts';
export declare class ProductCategoryCreateCommand implements ICommand {
    readonly input: IProductCategoryTranslatable;
    readonly language: LanguagesEnum;
    static readonly type = "[Product Category] Create";
    constructor(input: IProductCategoryTranslatable, language: LanguagesEnum);
}
