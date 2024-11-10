"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateIssueTypeDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../../core/dto");
const issue_type_entity_1 = require("../issue-type.entity");
class CreateIssueTypeDTO extends (0, swagger_1.IntersectionType)((0, swagger_1.PartialType)(dto_1.TenantOrganizationBaseDTO), issue_type_entity_1.IssueType) {
}
exports.CreateIssueTypeDTO = CreateIssueTypeDTO;
//# sourceMappingURL=create-issue-type.dto.js.map