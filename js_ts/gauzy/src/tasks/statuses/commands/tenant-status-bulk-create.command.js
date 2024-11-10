"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantStatusBulkCreateCommand = void 0;
class TenantStatusBulkCreateCommand {
    tenants;
    static type = '[Tenant Status] Bulk Create';
    constructor(tenants) {
        this.tenants = tenants;
    }
}
exports.TenantStatusBulkCreateCommand = TenantStatusBulkCreateCommand;
//# sourceMappingURL=tenant-status-bulk-create.command.js.map