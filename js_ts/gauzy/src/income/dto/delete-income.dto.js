"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteIncomeDTO = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const dto_1 = require("./../../employee/dto");
const income_dto_1 = require("./income.dto");
/**
 * Delete income request DTO validation
 */
class DeleteIncomeDTO extends (0, mapped_types_1.IntersectionType)((0, mapped_types_1.PickType)(income_dto_1.IncomeDTO, ['organization', 'organizationId']), (0, mapped_types_1.PartialType)(dto_1.EmployeeFeatureDTO)) {
}
exports.DeleteIncomeDTO = DeleteIncomeDTO;
//# sourceMappingURL=delete-income.dto.js.map