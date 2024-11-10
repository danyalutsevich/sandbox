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
exports.ExpenseUpdateHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const common_2 = require("../../../../plugins/common");
const expense_service_1 = require("../../expense.service");
const employee_service_1 = require("../../../employee/employee.service");
const employee_statistics_1 = require("../../../employee-statistics");
const expense_update_command_1 = require("../expense.update.command");
let ExpenseUpdateHandler = exports.ExpenseUpdateHandler = class ExpenseUpdateHandler {
    expenseService;
    employeeService;
    employeeStatisticsService;
    constructor(expenseService, employeeService, employeeStatisticsService) {
        this.expenseService = expenseService;
        this.employeeService = employeeService;
        this.employeeStatisticsService = employeeStatisticsService;
    }
    async execute(command) {
        let { id, entity } = command;
        try {
            await this.expenseService.findOneByIdString(id);
            const expense = await this.expenseService.create({
                id,
                ...entity
            });
            let averageExpense = 0;
            if ((0, common_2.isNotEmpty)(expense.employeeId)) {
                const { employeeId } = expense;
                const statistic = await this.employeeStatisticsService.getStatisticsByEmployeeId(employeeId);
                averageExpense = this.expenseService.countStatistic(statistic.expenseStatistics);
                await this.employeeService.create({
                    id: employeeId,
                    averageExpenses: averageExpense
                });
            }
            return expense;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.ExpenseUpdateHandler = ExpenseUpdateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(expense_update_command_1.ExpenseUpdateCommand),
    __metadata("design:paramtypes", [expense_service_1.ExpenseService,
        employee_service_1.EmployeeService,
        employee_statistics_1.EmployeeStatisticsService])
], ExpenseUpdateHandler);
//# sourceMappingURL=expense.update.handler.js.map