"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrganizationContactDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./../../tags/dto");
const organization_contact_dto_1 = require("./organization-contact.dto");
/**
 * Update Organization Contact DTO request validation
 */
class UpdateOrganizationContactDTO extends (0, swagger_1.IntersectionType)(organization_contact_dto_1.OrganizationContactDTO, dto_1.RelationalTagDTO) {
}
exports.UpdateOrganizationContactDTO = UpdateOrganizationContactDTO;
//# sourceMappingURL=update-organization-contact.dto.js.map