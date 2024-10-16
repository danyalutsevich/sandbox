"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePaymentDTO = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const dto_1 = require("./../../employee/dto");
const dto_2 = require("./../../currency/dto");
const dto_3 = require("./../../tags/dto");
const payment_dto_1 = require("./payment.dto");
/**
 * Create payment request DTO validation
 *
 */
class CreatePaymentDTO extends (0, mapped_types_1.IntersectionType)(payment_dto_1.PaymentDTO, dto_3.RelationalTagDTO, dto_2.RelationalCurrencyDTO, (0, mapped_types_1.PartialType)(dto_1.EmployeeFeatureDTO)) {
}
exports.CreatePaymentDTO = CreatePaymentDTO;
//# sourceMappingURL=create-payment.dto.js.map