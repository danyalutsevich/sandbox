"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationEntitySettingTiedUpdateCommand = void 0;
class IntegrationEntitySettingTiedUpdateCommand {
    integrationId;
    input;
    static type = '[Integration Entity Setting Tied] Update By Integration';
    constructor(integrationId, input) {
        this.integrationId = integrationId;
        this.input = input;
    }
}
exports.IntegrationEntitySettingTiedUpdateCommand = IntegrationEntitySettingTiedUpdateCommand;
//# sourceMappingURL=integration-entity-setting-tied.update.command.js.map