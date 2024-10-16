"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrganizationTeamActiveTaskDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const internal_1 = require("../../core/entities/internal");
const dto_1 = require("../../core/dto");
/**
 * Update team member active task entity DTO
 */
class UpdateOrganizationTeamActiveTaskDTO extends (0, swagger_1.IntersectionType)(dto_1.TenantOrganizationBaseDTO, (0, swagger_1.PickType)(internal_1.OrganizationTeamEmployee, ['activeTaskId', 'organizationTeamId'])) {
}
exports.UpdateOrganizationTeamActiveTaskDTO = UpdateOrganizationTeamActiveTaskDTO;
//# sourceMappingURL=update-organization-team-active-task.dto.js.map