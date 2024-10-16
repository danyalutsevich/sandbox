"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const tenant_setting_get_handler_1 = require("./tenant-setting.get.handler");
const tenant_setting_save_handler_1 = require("./tenant-setting.save.handler");
exports.CommandHandlers = [
    tenant_setting_get_handler_1.TenantSettingGetHandler,
    tenant_setting_save_handler_1.TenantSettingSaveHandler
];
//# sourceMappingURL=index.js.map