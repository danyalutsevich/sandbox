"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStatusDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const status_entity_1 = require("../status.entity");
const dto_1 = require("./../../../core/dto");
class CreateStatusDTO extends (0, swagger_1.IntersectionType)((0, swagger_1.PartialType)(dto_1.TenantOrganizationBaseDTO), status_entity_1.TaskStatus) {
}
exports.CreateStatusDTO = CreateStatusDTO;
//# sourceMappingURL=create-status.dto.js.map