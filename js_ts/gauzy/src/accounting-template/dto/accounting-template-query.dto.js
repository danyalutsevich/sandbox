"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountingTemplateQueryDTO = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const save_accounting_template_dto_1 = require("./save-accounting-template.dto");
/**
 * GET accounting template query request DTO validation
 */
class AccountingTemplateQueryDTO extends (0, mapped_types_1.OmitType)(save_accounting_template_dto_1.SaveAccountingTemplateDTO, ['mjml']) {
}
exports.AccountingTemplateQueryDTO = AccountingTemplateQueryDTO;
//# sourceMappingURL=accounting-template-query.dto.js.map