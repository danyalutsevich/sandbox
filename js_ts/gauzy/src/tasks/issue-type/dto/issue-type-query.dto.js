"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueTypeQueryDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const issue_type_entity_1 = require("../issue-type.entity");
const dto_1 = require("../../../core/dto");
class IssueTypeQueryDTO extends (0, swagger_1.IntersectionType)((0, swagger_1.PartialType)(dto_1.TenantOrganizationBaseDTO), (0, swagger_1.PickType)(issue_type_entity_1.IssueType, ['projectId', 'organizationTeamId'])) {
}
exports.IssueTypeQueryDTO = IssueTypeQueryDTO;
//# sourceMappingURL=issue-type-query.dto.js.map