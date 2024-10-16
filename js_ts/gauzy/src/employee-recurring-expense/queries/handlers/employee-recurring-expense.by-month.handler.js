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
exports.EmployeeRecurringExpenseByMonthHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const shared_1 = require("../../../shared");
const employee_recurring_expense_service_1 = require("../../employee-recurring-expense.service");
const employee_recurring_expense_by_month_query_1 = require("../employee-recurring-expense.by-month.query");
/**
 * Finds income, expense, profit and bonus for all employees for the given month.
 *
 * (start date) < (input date) < (end date, null for end date is treated as infinity)
 *
 * If year is different, only company year.
 * If year is same, compare month
 */
let EmployeeRecurringExpenseByMonthHandler = exports.EmployeeRecurringExpenseByMonthHandler = class EmployeeRecurringExpenseByMonthHandler extends shared_1.FindRecurringExpenseByMonthHandler {
    employeeRecurringExpenseService;
    constructor(employeeRecurringExpenseService) {
        super(employeeRecurringExpenseService);
        this.employeeRecurringExpenseService = employeeRecurringExpenseService;
    }
    async execute(command) {
        const { input, relations = [] } = command;
        return await this.executeCommand(input, relations);
    }
};
exports.EmployeeRecurringExpenseByMonthHandler = EmployeeRecurringExpenseByMonthHandler = __decorate([
    (0, cqrs_1.QueryHandler)(employee_recurring_expense_by_month_query_1.EmployeeRecurringExpenseByMonthQuery),
    __metadata("design:paramtypes", [employee_recurring_expense_service_1.EmployeeRecurringExpenseService])
], EmployeeRecurringExpenseByMonthHandler);
//# sourceMappingURL=employee-recurring-expense.by-month.handler.js.map