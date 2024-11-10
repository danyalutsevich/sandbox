"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskPriorityDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const priority_entity_1 = require("../priority.entity");
const dto_1 = require("./../../../core/dto");
class UpdateTaskPriorityDTO extends (0, swagger_1.IntersectionType)((0, swagger_1.PartialType)(dto_1.TenantOrganizationBaseDTO), (0, swagger_1.PartialType)(priority_entity_1.TaskPriority)) {
}
exports.UpdateTaskPriorityDTO = UpdateTaskPriorityDTO;
//# sourceMappingURL=update-priority.dto.js.map