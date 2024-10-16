"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const organization_task_setting_create_handler_1 = require("./organization-task-setting.create.handler");
const organization_task_setting_update_handler_1 = require("./organization-task-setting.update.handler");
exports.CommandHandlers = [
    organization_task_setting_create_handler_1.OrganizationTaskSettingCreateHandler,
    organization_task_setting_update_handler_1.OrganizationTaskSettingUpdateHandler
];
//# sourceMappingURL=index.js.map