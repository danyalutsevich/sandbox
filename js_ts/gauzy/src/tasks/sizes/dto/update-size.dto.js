"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskSizeDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./../../../core/dto");
const size_entity_1 = require("../size.entity");
class UpdateTaskSizeDTO extends (0, swagger_1.IntersectionType)((0, swagger_1.PartialType)(dto_1.TenantOrganizationBaseDTO), (0, swagger_1.PartialType)(size_entity_1.TaskSize)) {
}
exports.UpdateTaskSizeDTO = UpdateTaskSizeDTO;
//# sourceMappingURL=update-size.dto.js.map