"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrganizationProjectDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./../../core/dto");
const organization_project_dto_1 = require("./organization-project.dto");
/**
 * Update Organization Project DTO request validation
 */
class UpdateOrganizationProjectDTO extends (0, swagger_1.IntersectionType)((0, swagger_1.PartialType)(organization_project_dto_1.OrganizationProjectDTO), dto_1.TenantOrganizationBaseDTO) {
}
exports.UpdateOrganizationProjectDTO = UpdateOrganizationProjectDTO;
//# sourceMappingURL=update-organization-project.dto.js.map