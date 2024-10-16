"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateIncomeDTO = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const dto_1 = require("./../../currency/dto");
const dto_2 = require("./../../employee/dto");
const dto_3 = require("./../../tags/dto");
const income_dto_1 = require("./income.dto");
class CreateIncomeDTO extends (0, mapped_types_1.IntersectionType)(income_dto_1.IncomeDTO, (0, mapped_types_1.PartialType)(dto_2.EmployeeFeatureDTO), dto_3.RelationalTagDTO, dto_1.RelationalCurrencyDTO) {
}
exports.CreateIncomeDTO = CreateIncomeDTO;
//# sourceMappingURL=create-income.dto.js.map