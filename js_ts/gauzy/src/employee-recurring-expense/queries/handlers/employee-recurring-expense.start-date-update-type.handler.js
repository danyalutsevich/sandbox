"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeRecurringExpenseUpdateTypeHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const recurring_expense_find_update_type_handler_1 = require("../../../shared/handlers/recurring-expense.find-update-type.handler");
const employee_recurring_expense_service_1 = require("../../employee-recurring-expense.service");
const employee_recurring_expense_update_type_query_1 = require("../employee-recurring-expense.update-type.query");
let EmployeeRecurringExpenseUpdateTypeHandler = exports.EmployeeRecurringExpenseUpdateTypeHandler = class EmployeeRecurringExpenseUpdateTypeHandler extends recurring_expense_find_update_type_handler_1.FindRecurringExpenseStartDateUpdateTypeHandler {
    employeeRecurringExpenseService;
    constructor(employeeRecurringExpenseService) {
        super(employeeRecurringExpenseService);
        this.employeeRecurringExpenseService = employeeRecurringExpenseService;
    }
    async execute(command) {
        return await this.executeQuery(command.input);
    }
};
exports.EmployeeRecurringExpenseUpdateTypeHandler = EmployeeRecurringExpenseUpdateTypeHandler = __decorate([
    (0, cqrs_1.QueryHandler)(employee_recurring_expense_update_type_query_1.EmployeeRecurringExpenseStartDateUpdateTypeQuery),
    __metadata("design:paramtypes", [employee_recurring_expense_service_1.EmployeeRecurringExpenseService])
], EmployeeRecurringExpenseUpdateTypeHandler);
//# sourceMappingURL=employee-recurring-expense.start-date-update-type.handler.js.map