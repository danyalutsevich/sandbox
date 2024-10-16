"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const organization_project_create_handler_1 = require("./organization-project.create.handler");
const organization_project_edit_by_employee_handler_1 = require("./organization-project.edit-by-employee.handler");
const organization_project_setting_update_handler_1 = require("./organization-project-setting.update.handler");
const organization_project_update_handler_1 = require("./organization-project.update.handler");
exports.CommandHandlers = [
    organization_project_create_handler_1.OrganizationProjectCreateHandler,
    organization_project_edit_by_employee_handler_1.OrganizationProjectEditByEmployeeHandler,
    organization_project_setting_update_handler_1.OrganizationProjectSettingUpdateHandler,
    organization_project_update_handler_1.OrganizationProjectUpdateHandler,
];
//# sourceMappingURL=index.js.map