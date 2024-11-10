"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDailyPlanDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../../core/dto");
const create_daily_plan_dto_1 = require("./create-daily-plan.dto");
/**
 * Update Daily Plan DTO validation
 */
class UpdateDailyPlanDTO extends (0, swagger_1.IntersectionType)(dto_1.TenantOrganizationBaseDTO, (0, swagger_1.PartialType)((0, swagger_1.PickType)(create_daily_plan_dto_1.CreateDailyPlanDTO, ['date', 'workTimePlanned', 'status', 'employeeId']))) {
}
exports.UpdateDailyPlanDTO = UpdateDailyPlanDTO;
//# sourceMappingURL=update-daily-plan.dto.js.map