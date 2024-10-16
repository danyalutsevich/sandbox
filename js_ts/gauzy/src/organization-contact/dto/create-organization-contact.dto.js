"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrganizationContactDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const organization_contact_dto_1 = require("./organization-contact.dto");
const dto_1 = require("./../../tags/dto");
/**
 * Create Organization Contact DTO request validation
 */
class CreateOrganizationContactDTO extends (0, swagger_1.IntersectionType)(organization_contact_dto_1.OrganizationContactDTO, dto_1.RelationalTagDTO) {
}
exports.CreateOrganizationContactDTO = CreateOrganizationContactDTO;
//# sourceMappingURL=create-organization-contact.dto.js.map