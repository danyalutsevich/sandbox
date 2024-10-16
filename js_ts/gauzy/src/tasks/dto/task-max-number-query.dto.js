"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskMaxNumberQueryDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../core/dto");
const task_entity_1 = require("./../task.entity");
/**
 * GET task max number DTO validation
 */
class TaskMaxNumberQueryDTO extends (0, swagger_1.IntersectionType)(dto_1.TenantOrganizationBaseDTO, (0, swagger_1.PickType)(task_entity_1.Task, ['projectId'])) {
}
exports.TaskMaxNumberQueryDTO = TaskMaxNumberQueryDTO;
//# sourceMappingURL=task-max-number-query.dto.js.map