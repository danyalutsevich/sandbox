"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatesRelatedIssueTypeDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../../core/dto");
const related_issue_type_entity_1 = require("../related-issue-type.entity");
class UpdatesRelatedIssueTypeDTO extends (0, swagger_1.IntersectionType)((0, swagger_1.PartialType)(dto_1.TenantOrganizationBaseDTO), (0, swagger_1.PartialType)(related_issue_type_entity_1.TaskRelatedIssueType)) {
}
exports.UpdatesRelatedIssueTypeDTO = UpdatesRelatedIssueTypeDTO;
//# sourceMappingURL=update-related-issue-type.dto.js.map