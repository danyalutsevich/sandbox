"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EmployeeRecurringExpenseModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeRecurringExpenseModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const handlers_1 = require("./commands/handlers");
const employee_recurring_expense_controller_1 = require("./employee-recurring-expense.controller");
const employee_recurring_expense_entity_1 = require("./employee-recurring-expense.entity");
const employee_recurring_expense_service_1 = require("./employee-recurring-expense.service");
const handlers_2 = require("./queries/handlers");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const task_module_1 = require("../tasks/task.module");
let EmployeeRecurringExpenseModule = exports.EmployeeRecurringExpenseModule = EmployeeRecurringExpenseModule_1 = class EmployeeRecurringExpenseModule {
};
exports.EmployeeRecurringExpenseModule = EmployeeRecurringExpenseModule = EmployeeRecurringExpenseModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: '/employee-recurring-expense',
                    module: EmployeeRecurringExpenseModule_1
                }
            ]),
            typeorm_1.TypeOrmModule.forFeature([employee_recurring_expense_entity_1.EmployeeRecurringExpense]),
            nestjs_1.MikroOrmModule.forFeature([employee_recurring_expense_entity_1.EmployeeRecurringExpense]),
            role_permission_module_1.RolePermissionModule,
            task_module_1.TaskModule,
            cqrs_1.CqrsModule
        ],
        controllers: [employee_recurring_expense_controller_1.EmployeeRecurringExpenseController],
        providers: [employee_recurring_expense_service_1.EmployeeRecurringExpenseService, ...handlers_2.QueryHandlers, ...handlers_1.CommandHandlers],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, employee_recurring_expense_service_1.EmployeeRecurringExpenseService]
    })
], EmployeeRecurringExpenseModule);
//# sourceMappingURL=employee-recurring-expense.module.js.map