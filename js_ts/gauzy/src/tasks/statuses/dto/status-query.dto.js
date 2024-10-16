"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusQueryDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./../../../core/dto");
const status_entity_1 = require("./../status.entity");
class StatusQueryDTO extends (0, swagger_1.IntersectionType)((0, swagger_1.PartialType)(dto_1.TenantOrganizationBaseDTO), (0, swagger_1.PickType)(status_entity_1.TaskStatus, ['projectId', 'organizationTeamId'])) {
}
exports.StatusQueryDTO = StatusQueryDTO;
//# sourceMappingURL=status-query.dto.js.map