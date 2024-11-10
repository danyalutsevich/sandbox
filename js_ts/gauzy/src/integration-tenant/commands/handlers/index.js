"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const integration_tenant_create_handler_1 = require("./integration-tenant.create.handler");
const integration_tenant_delete_handler_1 = require("./integration-tenant.delete.handler");
const integration_tenant_get_handler_1 = require("./integration-tenant.get.handler");
const integration_tenant_update_handler_1 = require("./integration-tenant.update.handler");
const integration_tenant_update_or_create_handler_1 = require("./integration-tenant-update-or-create.handler");
exports.CommandHandlers = [
    integration_tenant_create_handler_1.IntegrationTenantCreateHandler,
    integration_tenant_delete_handler_1.IntegrationTenantDeleteHandler,
    integration_tenant_get_handler_1.IntegrationTenantGetHandler,
    integration_tenant_update_handler_1.IntegrationTenantUpdateHandler,
    integration_tenant_update_or_create_handler_1.IntegrationTenantUpdateOrCreateHandler
];
//# sourceMappingURL=index.js.map