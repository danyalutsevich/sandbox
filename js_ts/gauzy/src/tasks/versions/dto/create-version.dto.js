"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVersionDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const version_entity_1 = require("../version.entity");
const dto_1 = require("../../../core/dto");
class CreateVersionDTO extends (0, swagger_1.IntersectionType)((0, swagger_1.PartialType)(dto_1.TenantOrganizationBaseDTO), version_entity_1.TaskVersion) {
}
exports.CreateVersionDTO = CreateVersionDTO;
//# sourceMappingURL=create-version.dto.js.map