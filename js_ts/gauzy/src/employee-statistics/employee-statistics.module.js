"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EmployeeStatisticsModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeStatisticsModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const employee_recurring_expense_entity_1 = require("../employee-recurring-expense/employee-recurring-expense.entity");
const employee_recurring_expense_service_1 = require("../employee-recurring-expense/employee-recurring-expense.service");
const expense_entity_1 = require("../expense/expense.entity");
const expense_service_1 = require("../expense/expense.service");
const income_entity_1 = require("../income/income.entity");
const income_service_1 = require("../income/income.service");
const organization_module_1 = require("../organization/organization.module");
const employee_module_1 = require("../employee/employee.module");
const employee_statistics_controller_1 = require("./employee-statistics.controller");
const employee_statistics_service_1 = require("./employee-statistics.service");
const handlers_1 = require("./queries/handlers");
const organization_recurring_expense_entity_1 = require("../organization-recurring-expense/organization-recurring-expense.entity");
const organization_recurring_expense_service_1 = require("../organization-recurring-expense/organization-recurring-expense.service");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const forFeatureEntities = [
    income_entity_1.Income,
    expense_entity_1.Expense,
    employee_recurring_expense_entity_1.EmployeeRecurringExpense,
    organization_recurring_expense_entity_1.OrganizationRecurringExpense
];
let EmployeeStatisticsModule = exports.EmployeeStatisticsModule = EmployeeStatisticsModule_1 = class EmployeeStatisticsModule {
};
exports.EmployeeStatisticsModule = EmployeeStatisticsModule = EmployeeStatisticsModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/employee-statistics', module: EmployeeStatisticsModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature(forFeatureEntities),
            nestjs_1.MikroOrmModule.forFeature(forFeatureEntities),
            role_permission_module_1.RolePermissionModule,
            employee_module_1.EmployeeModule,
            organization_module_1.OrganizationModule,
            cqrs_1.CqrsModule
        ],
        controllers: [employee_statistics_controller_1.EmployeeStatisticsController],
        providers: [
            employee_statistics_service_1.EmployeeStatisticsService,
            income_service_1.IncomeService,
            expense_service_1.ExpenseService,
            employee_recurring_expense_service_1.EmployeeRecurringExpenseService,
            organization_recurring_expense_service_1.OrganizationRecurringExpenseService,
            ...handlers_1.QueryHandlers
        ],
        exports: [employee_statistics_service_1.EmployeeStatisticsService]
    })
], EmployeeStatisticsModule);
//# sourceMappingURL=employee-statistics.module.js.map