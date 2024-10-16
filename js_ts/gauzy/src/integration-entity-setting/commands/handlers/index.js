"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const integration_entity_setting_get_handler_1 = require("./integration-entity-setting.get.handler");
const integration_entity_setting_update_or_create_handler_1 = require("./integration-entity-setting-update-or-create.handler");
exports.CommandHandlers = [
    integration_entity_setting_get_handler_1.IntegrationEntitySettingGetHandler,
    integration_entity_setting_update_or_create_handler_1.IntegrationEntitySettingUpdateOrCreateHandler
];
//# sourceMappingURL=index.js.map