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
exports.EmployeeRecurringExpenseCreateHandler = void 0;
const index_1 = require("../../../../plugins/contracts/dist/index");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const context_1 = require("./../../../core/context");
const employee_recurring_expense_service_1 = require("../../employee-recurring-expense.service");
const employee_recurring_expense_create_command_1 = require("../employee-recurring-expense.create.command");
/**
 * Creates a recurring expense for an employee.
 * The parentRecurringExpenseId is it's own id since this is a new expense.
 */
let EmployeeRecurringExpenseCreateHandler = exports.EmployeeRecurringExpenseCreateHandler = class EmployeeRecurringExpenseCreateHandler {
    employeeRecurringExpenseService;
    constructor(employeeRecurringExpenseService) {
        this.employeeRecurringExpenseService = employeeRecurringExpenseService;
    }
    async execute(command) {
        try {
            const { input } = command;
            /**
             * If employee create self recurring expense
             */
            if (!context_1.RequestContext.hasPermission(index_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE)) {
                input.employeeId = context_1.RequestContext.currentEmployeeId();
            }
            else {
                input.employeeId = input.employeeId || null;
            }
            const recurringExpense = await this.employeeRecurringExpenseService.create(input);
            await this.employeeRecurringExpenseService.update(recurringExpense.id, {
                parentRecurringExpenseId: recurringExpense.id
            });
            return await this.employeeRecurringExpenseService.findOneByIdString(recurringExpense.id);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.EmployeeRecurringExpenseCreateHandler = EmployeeRecurringExpenseCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(employee_recurring_expense_create_command_1.EmployeeRecurringExpenseCreateCommand),
    __metadata("design:paramtypes", [employee_recurring_expense_service_1.EmployeeRecurringExpenseService])
], EmployeeRecurringExpenseCreateHandler);
//# sourceMappingURL=employee-recurring-expense.create.handler.js.map