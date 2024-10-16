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
exports.EmployeeRecurringExpenseDeleteHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const shared_1 = require("../../../shared");
const employee_recurring_expense_service_1 = require("../../employee-recurring-expense.service");
const employee_recurring_expense_delete_command_1 = require("../employee-recurring-expense.delete.command");
/**
 * Deletes a EmployeeRecurringExpense based on command.deleteInput.deletionType:
 *
 * 1. ALL: Delete all entries for an expense (By actually deleting it from the db)
 * 2. FUTURE : Delete only current and future events (By reducing the end date)
 * 3. CURRENT : Delete only one month (By splitting the expense into two)
 *
 */
let EmployeeRecurringExpenseDeleteHandler = exports.EmployeeRecurringExpenseDeleteHandler = class EmployeeRecurringExpenseDeleteHandler extends shared_1.RecurringExpenseDeleteHandler {
    employeeRecurringExpenseService;
    constructor(employeeRecurringExpenseService) {
        super(employeeRecurringExpenseService);
        this.employeeRecurringExpenseService = employeeRecurringExpenseService;
    }
    async execute(command) {
        const { id, deleteInput } = command;
        return await this.executeCommand(id, deleteInput);
    }
};
exports.EmployeeRecurringExpenseDeleteHandler = EmployeeRecurringExpenseDeleteHandler = __decorate([
    (0, cqrs_1.CommandHandler)(employee_recurring_expense_delete_command_1.EmployeeRecurringExpenseDeleteCommand),
    __metadata("design:paramtypes", [employee_recurring_expense_service_1.EmployeeRecurringExpenseService])
], EmployeeRecurringExpenseDeleteHandler);
//# sourceMappingURL=employee-recurring-expense.delete.handler.js.map