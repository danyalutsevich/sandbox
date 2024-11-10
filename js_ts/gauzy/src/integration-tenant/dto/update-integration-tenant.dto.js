"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateIntegrationTenantDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("core/dto");
const integration_tenant_entity_1 = require("../integration-tenant.entity");
/**
 * Represent a DTO (Data Transfer Object) for updating an integration tenant.
 */
class UpdateIntegrationTenantDTO extends (0, swagger_1.IntersectionType)(dto_1.TenantOrganizationBaseDTO, // Extends properties from the 'TenantOrganizationBaseDTO' type.
(0, swagger_1.PickType)(integration_tenant_entity_1.IntegrationTenant, ['isActive', 'isArchived']) // Extends specific properties from the 'IntegrationTenant' type.
) {
}
exports.UpdateIntegrationTenantDTO = UpdateIntegrationTenantDTO;
//# sourceMappingURL=update-integration-tenant.dto.js.map