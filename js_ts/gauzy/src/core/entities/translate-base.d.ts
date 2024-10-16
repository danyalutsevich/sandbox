import { ITranslation, ITranslatable, TranslatePropertyInput } from '../../../plugins/contracts';
import { TenantOrganizationBaseEntity } from '../entities/internal';
export declare abstract class TranslationBase extends TenantOrganizationBaseEntity implements ITranslation<TranslatableBase> {
    reference: ITranslatable<TranslatableBase>;
    languageCode: string;
}
export declare abstract class TranslatableBase extends TenantOrganizationBaseEntity implements ITranslatable<TranslationBase> {
    translations: ITranslation<TranslationBase>[];
    translate(langCode: string): any;
    translateNested(languageCode: string, translatePropsInput: Array<TranslatePropertyInput>): any;
}
