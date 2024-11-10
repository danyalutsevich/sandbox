import { AccountingTemplateTypeEnum, IAccountingTemplateUpdateInput, LanguagesEnum } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from "./../../core/dto";
/**
 * Save accounting template request DTO validation
 */
export declare class SaveAccountingTemplateDTO extends TenantOrganizationBaseDTO implements IAccountingTemplateUpdateInput {
    readonly languageCode: LanguagesEnum;
    readonly templateType: AccountingTemplateTypeEnum;
    readonly mjml: string;
}
