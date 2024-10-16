"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryHandlers = void 0;
const find_one_public_employee_handler_1 = require("./find-one-public-employee.handler");
const find_public_employees_by_organization_handler_1 = require("./find-public-employees-by-organization.handler");
exports.QueryHandlers = [
    find_one_public_employee_handler_1.FindOnePublicEmployeeHandler,
    find_public_employees_by_organization_handler_1.FindPublicEmployeesByOrganizationHandler,
];
//# sourceMappingURL=index.js.map