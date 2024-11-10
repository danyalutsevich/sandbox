"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrganizationProjectDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./../../core/dto");
const organization_project_dto_1 = require("./organization-project.dto");
/**
 * Create Organization Project DTO request validation
 */
class CreateOrganizationProjectDTO extends (0, swagger_1.IntersectionType)(organization_project_dto_1.OrganizationProjectDTO, dto_1.TenantOrganizationBaseDTO) {
}
exports.CreateOrganizationProjectDTO = CreateOrganizationProjectDTO;
//# sourceMappingURL=create-organization-project.dto.js.map