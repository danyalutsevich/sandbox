"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRelatedIssueTypeDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const related_issue_type_entity_1 = require("../related-issue-type.entity");
const dto_1 = require("../../../core/dto");
class CreateRelatedIssueTypeDTO extends (0, swagger_1.IntersectionType)((0, swagger_1.PartialType)(dto_1.TenantOrganizationBaseDTO), related_issue_type_entity_1.TaskRelatedIssueType) {
}
exports.CreateRelatedIssueTypeDTO = CreateRelatedIssueTypeDTO;
//# sourceMappingURL=create-related-issue-type.dto.js.map