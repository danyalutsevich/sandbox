"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorModule = void 0;
const common_1 = require("@nestjs/common");
const user_organization_module_1 = require("../../user-organization/user-organization.module");
const role_module_1 = require("../../role/role.module");
const employee_module_1 = require("../../employee/employee.module");
const expense_categories_module_1 = require("../../expense-categories/expense-categories.module");
const organization_team_module_1 = require("../../organization-team/organization-team.module");
const constraints_1 = require("./constraints");
let ValidatorModule = exports.ValidatorModule = class ValidatorModule {
};
exports.ValidatorModule = ValidatorModule = __decorate([
    (0, common_1.Module)({
        imports: [
            employee_module_1.EmployeeModule,
            user_organization_module_1.UserOrganizationModule,
            role_module_1.RoleModule,
            expense_categories_module_1.ExpenseCategoriesModule,
            organization_team_module_1.OrganizationTeamModule,
        ],
        providers: [
            constraints_1.TenantBelongsToUserConstraint,
            constraints_1.RoleAlreadyExistConstraint,
            constraints_1.RoleShouldExistConstraint,
            constraints_1.EmployeeBelongsToOrganizationConstraint,
            constraints_1.TeamAlreadyExistConstraint,
            constraints_1.ExpenseCategoryAlreadyExistConstraint,
            constraints_1.OrganizationBelongsToUserConstraint
        ],
        exports: []
    })
], ValidatorModule);
//# sourceMappingURL=validator.module.js.map