"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteQueryDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../core/dto");
/**
 * Delete query DTO
 *
 */
class DeleteQueryDTO extends (0, swagger_1.PickType)(dto_1.TenantOrganizationBaseDTO, ['organizationId', 'tenantId']) {
}
exports.DeleteQueryDTO = DeleteQueryDTO;
//# sourceMappingURL=delete-query.dto.js.map