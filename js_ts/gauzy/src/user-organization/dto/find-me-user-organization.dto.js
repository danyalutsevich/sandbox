"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindMeUserOrganizationDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const dto_1 = require("../../user/dto");
/**
 * DTO (Data Transfer Object) for finding user organization with "Find Me" query parameters.
 */
class FindMeUserOrganizationDTO extends (0, swagger_1.IntersectionType)((0, mapped_types_1.PickType)(dto_1.FindMeQueryDTO, ['includeEmployee'])) {
}
exports.FindMeUserOrganizationDTO = FindMeUserOrganizationDTO;
//# sourceMappingURL=find-me-user-organization.dto.js.map