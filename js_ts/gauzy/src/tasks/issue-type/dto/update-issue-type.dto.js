"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateIssueTypeDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const issue_type_entity_1 = require("../issue-type.entity");
const dto_1 = require("../../../core/dto");
class UpdateIssueTypeDTO extends (0, swagger_1.IntersectionType)((0, swagger_1.PartialType)(dto_1.TenantOrganizationBaseDTO), (0, swagger_1.PartialType)(issue_type_entity_1.IssueType)) {
}
exports.UpdateIssueTypeDTO = UpdateIssueTypeDTO;
//# sourceMappingURL=update-issue-type.dto.js.map