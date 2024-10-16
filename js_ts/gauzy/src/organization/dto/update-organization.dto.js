"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrganizationDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_organization_dto_1 = require("./create-organization.dto");
const organization_public_setting_dto_1 = require("./organization-public-setting.dto");
/**
 * Organization Update DTO validation
 *
 */
class UpdateOrganizationDTO extends (0, swagger_1.IntersectionType)(create_organization_dto_1.CreateOrganizationDTO, organization_public_setting_dto_1.OrganizationPublicSettingDTO) {
}
exports.UpdateOrganizationDTO = UpdateOrganizationDTO;
//# sourceMappingURL=update-organization.dto.js.map