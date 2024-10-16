"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const integration_setting_create_handler_1 = require("./integration-setting.create.handler");
const integration_setting_get_handler_1 = require("./integration-setting.get.handler");
const integration_setting_getMany_handler_1 = require("./integration-setting.getMany.handler");
const integration_setting_update_handler_1 = require("./integration-setting.update.handler");
exports.CommandHandlers = [
    integration_setting_create_handler_1.IntegrationSettingCreateHandler,
    integration_setting_get_handler_1.IntegrationSettingGetHandler,
    integration_setting_getMany_handler_1.IntegrationSettingGetManyHandler,
    integration_setting_update_handler_1.IntegrationSettingUpdateHandler,
];
//# sourceMappingURL=index.js.map