import { ICommand } from '@nestjs/cqrs';
import { IProductTypeTranslatable, LanguagesEnum } from '../../../plugins/contracts';
export declare class ProductTypeCreateCommand implements ICommand {
    readonly input: IProductTypeTranslatable;
    readonly language: LanguagesEnum;
    static readonly type = "[Product Type] Create";
    constructor(input: IProductTypeTranslatable, language: LanguagesEnum);
}
