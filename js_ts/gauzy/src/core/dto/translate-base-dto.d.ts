import { LanguagesEnum, TranslatePropertyInput } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from './tenant-organization-base.dto';
export declare abstract class TranslationBaseDTO extends TenantOrganizationBaseDTO {
    readonly name: string;
    readonly description: string;
    readonly languageCode: string;
}
export declare abstract class TranslatableBaseDTO<T> extends TenantOrganizationBaseDTO {
    readonly translations: T;
    readonly translate: (language: LanguagesEnum) => string;
    readonly translateNested: (language: LanguagesEnum, pros: TranslatePropertyInput[]) => any;
}
