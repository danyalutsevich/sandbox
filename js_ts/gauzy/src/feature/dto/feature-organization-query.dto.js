"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureOrganizationQueryDTO = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const dto_1 = require("./../../shared/dto");
const create_feature_toggle_dto_1 = require("./create-feature-toggle.dto");
/**
 * GET feature organization query request DTO validation
 */
class FeatureOrganizationQueryDTO extends (0, mapped_types_1.IntersectionType)(dto_1.RelationsQueryDTO, (0, mapped_types_1.PartialType)((0, mapped_types_1.OmitType)(create_feature_toggle_dto_1.CreateFeatureToggleDTO, ['isEnabled']))) {
}
exports.FeatureOrganizationQueryDTO = FeatureOrganizationQueryDTO;
//# sourceMappingURL=feature-organization-query.dto.js.map