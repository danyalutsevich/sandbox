"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimerStatusQueryDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./../../../core/dto");
const dto_2 = require("./../../../shared/dto");
const start_timer_dto_1 = require("./start-timer.dto");
const dto_3 = require("./../../statistic/dto");
const dto_4 = require("./../../../employee/dto");
/**
 * Comprehensive DTO for querying timer status, combining various other DTOs.
 */
class TimerStatusQueryDTO extends (0, swagger_1.IntersectionType)(dto_1.TenantOrganizationBaseDTO, (0, swagger_1.IntersectionType)((0, swagger_1.PartialType)((0, swagger_1.PickType)(dto_4.EmployeeFeatureDTO, ['employeeId'])), (0, swagger_1.PartialType)((0, swagger_1.PickType)(start_timer_dto_1.StartTimerDTO, ['source'])), (0, swagger_1.IntersectionType)(dto_2.SelectorsQueryDTO, dto_3.TodayDateRangeQueryDTO), dto_2.RelationsQueryDTO)) {
}
exports.TimerStatusQueryDTO = TimerStatusQueryDTO;
//# sourceMappingURL=timer-status-query.dto.js.map