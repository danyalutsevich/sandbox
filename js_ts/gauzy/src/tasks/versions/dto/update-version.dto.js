"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatesVersionDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../../core/dto");
const version_entity_1 = require("../version.entity");
class UpdatesVersionDTO extends (0, swagger_1.IntersectionType)((0, swagger_1.PartialType)(dto_1.TenantOrganizationBaseDTO), (0, swagger_1.PartialType)(version_entity_1.TaskVersion)) {
}
exports.UpdatesVersionDTO = UpdatesVersionDTO;
//# sourceMappingURL=update-version.dto.js.map