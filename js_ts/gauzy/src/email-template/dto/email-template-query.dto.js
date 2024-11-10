"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTemplateQueryDTO = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const save_email_template_dto_1 = require("./save-email-template.dto");
/**
 * GET email template query request DTO validation
 */
class EmailTemplateQueryDTO extends (0, mapped_types_1.OmitType)(save_email_template_dto_1.SaveEmailTemplateDTO, ['mjml', 'subject']) {
}
exports.EmailTemplateQueryDTO = EmailTemplateQueryDTO;
//# sourceMappingURL=email-template-query.dto.js.map