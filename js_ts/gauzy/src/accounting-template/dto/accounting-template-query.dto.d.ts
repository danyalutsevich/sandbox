import { IAccountingTemplateFindInput } from '../../../plugins/contracts';
import { SaveAccountingTemplateDTO } from "./save-accounting-template.dto";
declare const AccountingTemplateQueryDTO_base: import("@nestjs/mapped-types").MappedType<Omit<SaveAccountingTemplateDTO, "mjml">>;
/**
 * GET accounting template query request DTO validation
 */
export declare class AccountingTemplateQueryDTO extends AccountingTemplateQueryDTO_base implements IAccountingTemplateFindInput {
}
export {};
