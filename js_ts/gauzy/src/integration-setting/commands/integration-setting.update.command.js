"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationSettingUpdateCommand = void 0;
class IntegrationSettingUpdateCommand {
    integrationId;
    input;
    static type = '[Integration Setting] Update';
    constructor(integrationId, input) {
        this.integrationId = integrationId;
        this.input = input;
    }
}
exports.IntegrationSettingUpdateCommand = IntegrationSettingUpdateCommand;
//# sourceMappingURL=integration-setting.update.command.js.map