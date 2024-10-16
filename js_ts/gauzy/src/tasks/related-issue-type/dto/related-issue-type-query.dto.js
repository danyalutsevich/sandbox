"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelatedIssueTypeQueryDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../../core/dto");
const related_issue_type_entity_1 = require("../related-issue-type.entity");
class RelatedIssueTypeQueryDTO extends (0, swagger_1.IntersectionType)((0, swagger_1.PartialType)(dto_1.TenantOrganizationBaseDTO), (0, swagger_1.PickType)(related_issue_type_entity_1.TaskRelatedIssueType, ['projectId', 'organizationTeamId'])) {
}
exports.RelatedIssueTypeQueryDTO = RelatedIssueTypeQueryDTO;
//# sourceMappingURL=related-issue-type-query.dto.js.map