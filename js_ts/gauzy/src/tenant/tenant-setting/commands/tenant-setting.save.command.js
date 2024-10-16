"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantSettingSaveCommand = void 0;
class TenantSettingSaveCommand {
    input;
    tenantId;
    static type = '[Tenant] Setting Save';
    constructor(input, tenantId) {
        this.input = input;
        this.tenantId = tenantId;
    }
}
exports.TenantSettingSaveCommand = TenantSettingSaveCommand;
//# sourceMappingURL=tenant-setting.save.command.js.map