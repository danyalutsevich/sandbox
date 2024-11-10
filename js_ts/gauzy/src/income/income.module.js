"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var IncomeModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cqrs_1 = require("@nestjs/cqrs");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const income_entity_1 = require("./income.entity");
const income_service_1 = require("./income.service");
const income_controller_1 = require("./income.controller");
const handlers_1 = require("./commands/handlers");
const employee_recurring_expense_module_1 = require("./../employee-recurring-expense/employee-recurring-expense.module");
const employee_statistics_module_1 = require("./../employee-statistics/employee-statistics.module");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const expense_module_1 = require("./../expense/expense.module");
const employee_module_1 = require("./../employee/employee.module");
const organization_recurring_expense_module_1 = require("./../organization-recurring-expense/organization-recurring-expense.module");
let IncomeModule = exports.IncomeModule = IncomeModule_1 = class IncomeModule {
};
exports.IncomeModule = IncomeModule = IncomeModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/income', module: IncomeModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([income_entity_1.Income]),
            nestjs_1.MikroOrmModule.forFeature([income_entity_1.Income]),
            (0, common_1.forwardRef)(() => role_permission_module_1.RolePermissionModule),
            (0, common_1.forwardRef)(() => employee_module_1.EmployeeModule),
            (0, common_1.forwardRef)(() => expense_module_1.ExpenseModule),
            (0, common_1.forwardRef)(() => employee_recurring_expense_module_1.EmployeeRecurringExpenseModule),
            (0, common_1.forwardRef)(() => organization_recurring_expense_module_1.OrganizationRecurringExpenseModule),
            (0, common_1.forwardRef)(() => employee_statistics_module_1.EmployeeStatisticsModule),
            cqrs_1.CqrsModule
        ],
        controllers: [income_controller_1.IncomeController],
        providers: [income_service_1.IncomeService, ...handlers_1.CommandHandlers],
        exports: [income_service_1.IncomeService]
    })
], IncomeModule);
//# sourceMappingURL=income.module.js.map