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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseMapService = void 0;
const common_1 = require("@nestjs/common");
const moment_1 = __importDefault(require("moment"));
const underscore_1 = require("underscore");
let ExpenseMapService = exports.ExpenseMapService = class ExpenseMapService {
    constructor() { }
    mapByDate(expenses) {
        const dailyLogs = this.groupByDate(expenses).map((byDateExpense, date) => {
            const sum = this.getDurationSum(byDateExpense);
            const byEmployee = this.groupByEmployee(byDateExpense).map((byEmployeeExpense) => {
                const byProject = this.groupByProject(byEmployeeExpense).map((byProjectExpense) => {
                    const project = byProjectExpense.length > 0 &&
                        byProjectExpense[0]
                        ? byProjectExpense[0].project
                        : null;
                    return {
                        project,
                        expanse: byProjectExpense.map((row) => this.mapExpensePercentage(row, sum))
                    };
                }).value();
                const employee = byEmployeeExpense.length > 0 && byEmployeeExpense[0]
                    ? byEmployeeExpense[0].employee
                    : null;
                return {
                    employee,
                    projects: byProject
                };
            }).value();
            return {
                date,
                employees: byEmployee
            };
        }).value();
        return dailyLogs;
    }
    mapByEmployee(expenses) {
        const byEmployee = this.groupByEmployee(expenses).map((byEmployeeExpense) => {
            const sum = this.getDurationSum(byEmployeeExpense);
            const dailyLogs = this.groupByDate(byEmployeeExpense).map((byDateExpense, date) => {
                const byProject = this.groupByProject(byDateExpense).map((byProjectExpense) => {
                    const project = byProjectExpense.length > 0 &&
                        byProjectExpense[0]
                        ? byProjectExpense[0].project
                        : null;
                    return {
                        project,
                        expanse: byProjectExpense.map((row) => this.mapExpensePercentage(row, sum))
                    };
                }).value();
                return {
                    date,
                    projects: byProject
                };
            }).value();
            const employee = byEmployeeExpense.length > 0 && byEmployeeExpense[0]
                ? byEmployeeExpense[0].employee
                : null;
            return {
                employee,
                dates: dailyLogs
            };
        }).value();
        return byEmployee;
    }
    mapByProject(expenses) {
        const byEmployee = this.groupByProject(expenses).map((byProjectExpense) => {
            const sum = this.getDurationSum(byProjectExpense);
            const dailyLogs = this.groupByDate(byProjectExpense).map((byDateExpense, date) => {
                const byProject = this.groupByEmployee(byDateExpense).map((byEmployeeExpense) => {
                    const employee = byEmployeeExpense.length > 0 &&
                        byEmployeeExpense[0]
                        ? byEmployeeExpense[0].employee
                        : null;
                    return {
                        employee,
                        expanse: byEmployeeExpense.map((row) => this.mapExpensePercentage(row, sum))
                    };
                }).value();
                return {
                    date,
                    employees: byProject
                };
            }).value();
            const project = byProjectExpense.length > 0 && byProjectExpense[0]
                ? byProjectExpense[0].project
                : null;
            return {
                project,
                dates: dailyLogs
            };
        }).value();
        return byEmployee;
    }
    groupByProject(expenses) {
        return (0, underscore_1.chain)(expenses).groupBy((expanse) => {
            return expanse.projectId;
        });
    }
    groupByDate(expenses) {
        return (0, underscore_1.chain)(expenses).groupBy((expanse) => {
            return moment_1.default.utc(expanse.valueDate).add(1, 'day').format('YYYY-MM-DD');
        });
    }
    groupByEmployee(expenses) {
        return (0, underscore_1.chain)(expenses).groupBy((expanse) => {
            return expanse.employeeId;
        });
    }
    mapExpensePercentage(expanse, sum = 0) {
        expanse.duration_percentage =
            (parseInt(expanse.duration, 10) * 100) / sum;
        return expanse;
    }
    getDurationSum(expenses) {
        return expenses.reduce((iteratee, log) => {
            return iteratee + parseInt(log.duration, 10);
        }, 0);
    }
};
exports.ExpenseMapService = ExpenseMapService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ExpenseMapService);
//# sourceMappingURL=expense.map.service.js.map