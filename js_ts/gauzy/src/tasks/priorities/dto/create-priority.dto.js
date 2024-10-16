"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTaskPriorityDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./../../../core/dto");
const priority_entity_1 = require("../priority.entity");
class CreateTaskPriorityDTO extends (0, swagger_1.IntersectionType)((0, swagger_1.PartialType)(dto_1.TenantOrganizationBaseDTO), priority_entity_1.TaskPriority) {
}
exports.CreateTaskPriorityDTO = CreateTaskPriorityDTO;
//# sourceMappingURL=create-priority.dto.js.map