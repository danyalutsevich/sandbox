"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTaskSizeDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../../core/dto");
const size_entity_1 = require("../size.entity");
class CreateTaskSizeDTO extends (0, swagger_1.IntersectionType)((0, swagger_1.PartialType)(dto_1.TenantOrganizationBaseDTO), size_entity_1.TaskSize) {
}
exports.CreateTaskSizeDTO = CreateTaskSizeDTO;
//# sourceMappingURL=create-size.dto.js.map