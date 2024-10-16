"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OrganizationRecurringExpenseModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationRecurringExpenseModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const handlers_1 = require("./commands/handlers");
const organization_recurring_expense_controller_1 = require("./organization-recurring-expense.controller");
const organization_recurring_expense_entity_1 = require("./organization-recurring-expense.entity");
const organization_recurring_expense_service_1 = require("./organization-recurring-expense.service");
const handlers_2 = require("./queries/handlers");
const employee_module_1 = require("../employee/employee.module");
const organization_module_1 = require("../organization/organization.module");
const role_permission_module_1 = require("../role-permission/role-permission.module");
let OrganizationRecurringExpenseModule = exports.OrganizationRecurringExpenseModule = OrganizationRecurringExpenseModule_1 = class OrganizationRecurringExpenseModule {
};
exports.OrganizationRecurringExpenseModule = OrganizationRecurringExpenseModule = OrganizationRecurringExpenseModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: '/organization-recurring-expense',
                    module: OrganizationRecurringExpenseModule_1
                }
            ]),
            typeorm_1.TypeOrmModule.forFeature([organization_recurring_expense_entity_1.OrganizationRecurringExpense]),
            nestjs_1.MikroOrmModule.forFeature([organization_recurring_expense_entity_1.OrganizationRecurringExpense]),
            role_permission_module_1.RolePermissionModule,
            employee_module_1.EmployeeModule,
            organization_module_1.OrganizationModule,
            cqrs_1.CqrsModule
        ],
        controllers: [organization_recurring_expense_controller_1.OrganizationRecurringExpenseController],
        providers: [
            organization_recurring_expense_service_1.OrganizationRecurringExpenseService,
            ...handlers_2.QueryHandlers,
            ...handlers_1.CommandHandlers
        ],
        exports: [organization_recurring_expense_service_1.OrganizationRecurringExpenseService]
    })
], OrganizationRecurringExpenseModule);
//# sourceMappingURL=organization-recurring-expense.module.js.map