import { ICustomizeEmailTemplateFindInput, LanguagesEnum } from '../../../plugins/contracts';
import { IQuery } from '@nestjs/cqrs';
export declare class FindEmailTemplateQuery implements IQuery {
    readonly input: ICustomizeEmailTemplateFindInput;
    readonly themeLanguage: LanguagesEnum;
    static readonly type = "[EmailTemplate] Find";
    constructor(input: ICustomizeEmailTemplateFindInput, themeLanguage: LanguagesEnum);
}
