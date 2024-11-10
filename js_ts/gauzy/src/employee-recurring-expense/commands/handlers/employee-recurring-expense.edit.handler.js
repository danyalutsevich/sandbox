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
exports.EmployeeRecurringExpenseEditHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const shared_1 = require("../../../shared");
const employee_recurring_expense_service_1 = require("../../employee-recurring-expense.service");
const employee_recurring_expense_update_type_query_1 = require("../../queries/employee-recurring-expense.update-type.query");
const employee_recurring_expense_edit_command_1 = require("../employee-recurring-expense.edit.command");
/**
 * This edits the value of a recurring expense.
 * To edit a recurring expense
 * 1. Change the end date of the original expense so that old value is not modified for previous expense.
 * 2. Create a new expense to have new values for all future dates.
 */
let EmployeeRecurringExpenseEditHandler = exports.EmployeeRecurringExpenseEditHandler = class EmployeeRecurringExpenseEditHandler extends shared_1.RecurringExpenseEditHandler {
    employeeRecurringExpenseService;
    queryBus;
    constructor(employeeRecurringExpenseService, queryBus) {
        super(employeeRecurringExpenseService);
        this.employeeRecurringExpenseService = employeeRecurringExpenseService;
        this.queryBus = queryBus;
    }
    async execute(command) {
        const { id, input } = command;
        //TODO: Remove this, RecurringExpenseEditHandler should not need startDateUpdateType
        const updateType = await this.queryBus.execute(new employee_recurring_expense_update_type_query_1.EmployeeRecurringExpenseStartDateUpdateTypeQuery({
            newStartDate: new Date(input.startYear, input.startMonth, input.startDay),
            recurringExpenseId: id
        }));
        return await this.executeCommand(id, {
            ...input,
            startDateUpdateType: updateType.value
        });
    }
};
exports.EmployeeRecurringExpenseEditHandler = EmployeeRecurringExpenseEditHandler = __decorate([
    (0, cqrs_1.CommandHandler)(employee_recurring_expense_edit_command_1.EmployeeRecurringExpenseEditCommand),
    __metadata("design:paramtypes", [employee_recurring_expense_service_1.EmployeeRecurringExpenseService,
        cqrs_1.QueryBus])
], EmployeeRecurringExpenseEditHandler);
//# sourceMappingURL=employee-recurring-expense.edit.handler.js.map