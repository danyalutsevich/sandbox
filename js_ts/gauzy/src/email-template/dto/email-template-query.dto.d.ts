import { IEmailTemplateFindInput } from "../../../plugins/contracts";
import { SaveEmailTemplateDTO } from "./save-email-template.dto";
declare const EmailTemplateQueryDTO_base: import("@nestjs/mapped-types").MappedType<Omit<SaveEmailTemplateDTO, "mjml" | "subject">>;
/**
 * GET email template query request DTO validation
 */
export declare class EmailTemplateQueryDTO extends EmailTemplateQueryDTO_base implements IEmailTemplateFindInput {
}
export {};
