"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateIncomeDTO = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const dto_1 = require("./../../currency/dto");
const dto_2 = require("./../../tags/dto");
const income_dto_1 = require("./income.dto");
/**
 * Update income request DTO validation
 */
class UpdateIncomeDTO extends (0, mapped_types_1.IntersectionType)(income_dto_1.IncomeDTO, dto_2.RelationalTagDTO, dto_1.RelationalCurrencyDTO) {
}
exports.UpdateIncomeDTO = UpdateIncomeDTO;
//# sourceMappingURL=update-income.dto.js.map