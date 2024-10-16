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
exports.ExpenseDeleteHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const common_2 = require("../../../../plugins/common");
const contracts_1 = require("../../../../plugins/contracts");
const expense_service_1 = require("../../expense.service");
const employee_service_1 = require("../../../employee/employee.service");
const employee_statistics_1 = require("../../../employee-statistics");
const expense_delete_command_1 = require("../expense.delete.command");
const context_1 = require("./../../../core/context");
let ExpenseDeleteHandler = exports.ExpenseDeleteHandler = class ExpenseDeleteHandler {
    expenseService;
    employeeService;
    employeeStatisticsService;
    constructor(expenseService, employeeService, employeeStatisticsService) {
        this.expenseService = expenseService;
        this.employeeService = employeeService;
        this.employeeStatisticsService = employeeStatisticsService;
    }
    async execute(command) {
        const { expenseId } = command;
        const result = await this.deleteExpense(expenseId);
        try {
            const { employeeId } = command;
            if ((0, common_2.isNotEmpty)(employeeId)) {
                let averageExpense = 0;
                const stat = await this.employeeStatisticsService.getStatisticsByEmployeeId(employeeId);
                averageExpense = this.expenseService.countStatistic(stat.expenseStatistics);
                await this.employeeService.create({
                    id: employeeId,
                    averageExpenses: averageExpense
                });
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
        return result;
    }
    async deleteExpense(expenseId) {
        try {
            if (context_1.RequestContext.hasPermission(contracts_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE)) {
                return await this.expenseService.delete(expenseId);
            }
            else {
                return await this.expenseService.delete({
                    id: expenseId,
                    employeeId: context_1.RequestContext.currentEmployeeId(),
                    tenantId: context_1.RequestContext.currentTenantId()
                });
            }
        }
        catch (error) {
            throw new common_1.ForbiddenException();
        }
    }
};
exports.ExpenseDeleteHandler = ExpenseDeleteHandler = __decorate([
    (0, cqrs_1.CommandHandler)(expense_delete_command_1.ExpenseDeleteCommand),
    __metadata("design:paramtypes", [expense_service_1.ExpenseService,
        employee_service_1.EmployeeService,
        employee_statistics_1.EmployeeStatisticsService])
], ExpenseDeleteHandler);
//# sourceMappingURL=expense.delete.handler.js.map