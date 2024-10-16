"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskSizeQueryDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const size_entity_1 = require("../size.entity");
const dto_1 = require("./../../../core/dto");
class TaskSizeQueryDTO extends (0, swagger_1.IntersectionType)((0, swagger_1.PartialType)(dto_1.TenantOrganizationBaseDTO), (0, swagger_1.PickType)(size_entity_1.TaskSize, ['projectId', 'organizationTeamId'])) {
}
exports.TaskSizeQueryDTO = TaskSizeQueryDTO;
//# sourceMappingURL=size-query.dto.js.map