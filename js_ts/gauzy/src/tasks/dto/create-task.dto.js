"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTaskDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./../../core/dto");
const task_entity_1 = require("./../task.entity");
/**
 * Create task validation request DTO
 */
class CreateTaskDTO extends (0, swagger_1.IntersectionType)(dto_1.TenantOrganizationBaseDTO, (0, swagger_1.OmitType)(task_entity_1.Task, ['organizationId', 'organization'])) {
}
exports.CreateTaskDTO = CreateTaskDTO;
//# sourceMappingURL=create-task.dto.js.map