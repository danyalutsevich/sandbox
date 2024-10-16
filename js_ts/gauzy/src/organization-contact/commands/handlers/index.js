"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const organization_contact_edit_by_employee_handler_1 = require("./organization-contact.edit-by-employee.handler");
const organization_contact_create_handler_1 = require("./organization-contact-create.handler");
const organization_contact_update_handler_1 = require("./organization-contact-update.handler");
exports.CommandHandlers = [
    organization_contact_create_handler_1.OrganizationContactCreateHandler,
    organization_contact_edit_by_employee_handler_1.OrganizationContactEditByEmployeeHandler,
    organization_contact_update_handler_1.OrganizationContactUpdateHandler
];
//# sourceMappingURL=index.js.map