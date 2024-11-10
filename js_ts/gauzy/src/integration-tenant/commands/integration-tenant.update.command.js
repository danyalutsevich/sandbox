"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationTenantUpdateCommand = void 0;
class IntegrationTenantUpdateCommand {
    id;
    input;
    static type = '[Integration] Update Integration';
    constructor(id, input) {
        this.id = id;
        this.input = input;
    }
}
exports.IntegrationTenantUpdateCommand = IntegrationTenantUpdateCommand;
//# sourceMappingURL=integration-tenant.update.command.js.map