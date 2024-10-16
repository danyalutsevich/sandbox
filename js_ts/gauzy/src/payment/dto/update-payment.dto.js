"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePaymentDTO = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const dto_1 = require("./../../currency/dto");
const dto_2 = require("./../../tags/dto");
const payment_dto_1 = require("./payment.dto");
/**
 * Update payment request DTO validation
 *
 */
class UpdatePaymentDTO extends (0, mapped_types_1.IntersectionType)(payment_dto_1.PaymentDTO, dto_2.RelationalTagDTO, dto_1.RelationalCurrencyDTO) {
}
exports.UpdatePaymentDTO = UpdatePaymentDTO;
//# sourceMappingURL=update-payment.dto.js.map