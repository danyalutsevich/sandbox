"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeAggregatedStatisticByMonthQueryDTO = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const dto_1 = require("../../employee/dto");
const dto_2 = require("../../shared/dto");
/**
 * Get employee statistic query request DTO validation
 */
class EmployeeAggregatedStatisticByMonthQueryDTO extends (0, mapped_types_1.IntersectionType)(dto_2.DateRangeQueryDTO, dto_1.EmployeeFeatureDTO) {
}
exports.EmployeeAggregatedStatisticByMonthQueryDTO = EmployeeAggregatedStatisticByMonthQueryDTO;
//# sourceMappingURL=employee-aggregated-statistic-by-month-query.dto.js.map