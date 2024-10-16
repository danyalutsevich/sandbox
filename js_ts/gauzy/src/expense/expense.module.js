"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ExpenseModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const cqrs_1 = require("@nestjs/cqrs");
const nestjs_1 = require("@mikro-orm/nestjs");
const expense_entity_1 = require("./expense.entity");
const expense_service_1 = require("./expense.service");
const expense_controller_1 = require("./expense.controller");
const handlers_1 = require("./commands/handlers");
const handlers_2 = require("./queries/handlers");
const employee_statistics_module_1 = require("./../employee-statistics/employee-statistics.module");
const employee_recurring_expense_module_1 = require("./../employee-recurring-expense/employee-recurring-expense.module");
const income_module_1 = require("./../income/income.module");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const expense_map_service_1 = require("./expense.map.service");
const employee_module_1 = require("./../employee/employee.module");
const organization_recurring_expense_module_1 = require("./../organization-recurring-expense/organization-recurring-expense.module");
let ExpenseModule = exports.ExpenseModule = ExpenseModule_1 = class ExpenseModule {
};
exports.ExpenseModule = ExpenseModule = ExpenseModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/expense', module: ExpenseModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([expense_entity_1.Expense]),
            nestjs_1.MikroOrmModule.forFeature([expense_entity_1.Expense]),
            (0, common_1.forwardRef)(() => employee_statistics_module_1.EmployeeStatisticsModule),
            (0, common_1.forwardRef)(() => employee_recurring_expense_module_1.EmployeeRecurringExpenseModule),
            (0, common_1.forwardRef)(() => organization_recurring_expense_module_1.OrganizationRecurringExpenseModule),
            (0, common_1.forwardRef)(() => income_module_1.IncomeModule),
            (0, common_1.forwardRef)(() => role_permission_module_1.RolePermissionModule),
            (0, common_1.forwardRef)(() => employee_module_1.EmployeeModule),
            cqrs_1.CqrsModule
        ],
        controllers: [expense_controller_1.ExpenseController],
        providers: [expense_service_1.ExpenseService, expense_map_service_1.ExpenseMapService, ...handlers_1.CommandHandlers, ...handlers_2.QueryHandlers],
        exports: [expense_service_1.ExpenseService, expense_map_service_1.ExpenseMapService]
    })
], ExpenseModule);
//# sourceMappingURL=expense.module.js.map