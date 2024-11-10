"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTeamMemberDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const internal_1 = require("./../../core/entities/internal");
const update_organization_team_active_task_dto_1 = require("./update-organization-team-active-task.dto");
/**
 * Update team member entity DTO
 */
class UpdateTeamMemberDTO extends (0, swagger_1.IntersectionType)(update_organization_team_active_task_dto_1.UpdateOrganizationTeamActiveTaskDTO, (0, swagger_1.PickType)(internal_1.OrganizationTeamEmployee, ['isTrackingEnabled', 'organizationTeamId'])) {
}
exports.UpdateTeamMemberDTO = UpdateTeamMemberDTO;
//# sourceMappingURL=update-team-member.dto.js.map