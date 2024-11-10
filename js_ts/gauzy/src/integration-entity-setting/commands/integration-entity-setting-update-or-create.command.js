"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationEntitySettingUpdateOrCreateCommand = void 0;
class IntegrationEntitySettingUpdateOrCreateCommand {
    integrationId;
    input;
    static type = '[Integration Entity Setting] Update Or Create By Integration';
    constructor(integrationId, input) {
        this.integrationId = integrationId;
        this.input = input;
    }
}
exports.IntegrationEntitySettingUpdateOrCreateCommand = IntegrationEntitySettingUpdateOrCreateCommand;
//# sourceMappingURL=integration-entity-setting-update-or-create.command.js.map