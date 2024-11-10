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
exports.IncomeDeleteHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const common_2 = require("../../../../plugins/common");
const contracts_1 = require("../../../../plugins/contracts");
const income_service_1 = require("../../income.service");
const employee_service_1 = require("../../../employee/employee.service");
const employee_statistics_1 = require("../../../employee-statistics");
const income_delete_command_1 = require("../income.delete.command");
const context_1 = require("./../../../core/context");
let IncomeDeleteHandler = exports.IncomeDeleteHandler = class IncomeDeleteHandler {
    incomeService;
    employeeService;
    employeeStatisticsService;
    constructor(incomeService, employeeService, employeeStatisticsService) {
        this.incomeService = incomeService;
        this.employeeService = employeeService;
        this.employeeStatisticsService = employeeStatisticsService;
    }
    async execute(command) {
        const { incomeId } = command;
        const result = await this.deleteIncome(incomeId);
        try {
            const { employeeId } = command;
            if ((0, common_2.isNotEmpty)(employeeId)) {
                let averageIncome = 0;
                let averageBonus = 0;
                const stat = await this.employeeStatisticsService.getStatisticsByEmployeeId(employeeId);
                averageIncome = this.incomeService.countStatistic(stat.incomeStatistics);
                averageBonus = this.incomeService.countStatistic(stat.bonusStatistics);
                await this.employeeService.create({
                    id: employeeId,
                    averageIncome: averageIncome,
                    averageBonus: averageBonus
                });
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
        return result;
    }
    async deleteIncome(incomeId) {
        try {
            if (context_1.RequestContext.hasPermission(contracts_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE)) {
                return await this.incomeService.delete(incomeId);
            }
            else {
                return await this.incomeService.delete({
                    id: incomeId,
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
exports.IncomeDeleteHandler = IncomeDeleteHandler = __decorate([
    (0, cqrs_1.CommandHandler)(income_delete_command_1.IncomeDeleteCommand),
    __metadata("design:paramtypes", [income_service_1.IncomeService,
        employee_service_1.EmployeeService,
        employee_statistics_1.EmployeeStatisticsService])
], IncomeDeleteHandler);
//# sourceMappingURL=income.delete.handler.js.map