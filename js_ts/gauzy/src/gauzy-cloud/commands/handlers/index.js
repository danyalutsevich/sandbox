"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const gauzy_cloud_organization_migrate_handler_1 = require("./gauzy-cloud-organization.migrate.handler");
const gauzy_cloud_tenant_migrate_handler_1 = require("./gauzy-cloud-tenant.migrate.handler");
const gauzy_cloud_user_migrate_handler_1 = require("./gauzy-cloud-user.migrate.handler");
exports.CommandHandlers = [
    gauzy_cloud_user_migrate_handler_1.GauzyCloudUserMigrateHandler,
    gauzy_cloud_tenant_migrate_handler_1.GauzyCloudTenantMigrateHandler,
    gauzy_cloud_organization_migrate_handler_1.GauzyCloudOrganizationMigrateHandler
];
//# sourceMappingURL=index.js.map