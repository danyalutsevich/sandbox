"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTeamMemberQueryDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./../../shared/dto");
const internal_1 = require("./../../core/entities/internal");
/**
 * Delete team member query DTO
 */
class DeleteTeamMemberQueryDTO extends (0, swagger_1.IntersectionType)(dto_1.DeleteQueryDTO, (0, swagger_1.PickType)(internal_1.OrganizationTeamEmployee, ['organizationTeamId'])) {
}
exports.DeleteTeamMemberQueryDTO = DeleteTeamMemberQueryDTO;
//# sourceMappingURL=delete-team-member-query.dto.js.map