"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInvoiceDTO = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const dto_1 = require("./../../tags/dto");
const discount_invoice_dto_1 = require("./discount-invoice.dto");
const invoice_dto_1 = require("./invoice.dto");
const tax_invoice_dto_1 = require("./tax-invoice.dto");
class UpdateInvoiceDTO extends (0, mapped_types_1.IntersectionType)(invoice_dto_1.InvoiceDTO, tax_invoice_dto_1.TaxInvoiceDTO, dto_1.RelationalTagDTO, discount_invoice_dto_1.DiscountInvoiceDTO) {
}
exports.UpdateInvoiceDTO = UpdateInvoiceDTO;
//# sourceMappingURL=update-invoice.dto.js.map