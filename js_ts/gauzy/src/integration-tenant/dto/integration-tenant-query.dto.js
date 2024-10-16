"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationTenantQueryDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../core/dto");
const dto_2 = require("../../shared/dto");
const integration_tenant_entity_1 = require("../integration-tenant.entity");
class IntegrationTenantQueryDTO extends (0, swagger_1.IntersectionType)((0, swagger_1.IntersectionType)(dto_1.TenantOrganizationBaseDTO, dto_2.RelationsQueryDTO), (0, swagger_1.PickType)(integration_tenant_entity_1.IntegrationTenant, ['name'])) {
}
exports.IntegrationTenantQueryDTO = IntegrationTenantQueryDTO;
//# sourceMappingURL=integration-tenant-query.dto.js.map