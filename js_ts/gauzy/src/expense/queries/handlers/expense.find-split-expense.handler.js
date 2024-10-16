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
exports.FindSplitExpenseHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const employee_service_1 = require("../../../employee/employee.service");
const expense_service_1 = require("../../expense.service");
const expense_find_split_expense_query_1 = require("../expense.find-split-expense.query");
/**
 * Finds the split expense for a given organization.
 *
 * 1. Find all expenses for organization which have splitExpense = true & all for the employee
 * 2. Find all employees of the organization (TODO: No. of employees CURRENTLY in the organization?)
 * 3. Divide the value of the expense found in 1 to the no. of employees found in 2 to 'split' the expense equally for all employees.
 */
let FindSplitExpenseHandler = exports.FindSplitExpenseHandler = class FindSplitExpenseHandler {
    expenseService;
    employeeService;
    constructor(expenseService, employeeService) {
        this.expenseService = expenseService;
        this.employeeService = employeeService;
    }
    async execute(query) {
        const { findInput: { relations, filterDate, employeeId } } = query;
        const employee = await this.employeeService.findOneByOptions({
            where: {
                id: employeeId
            },
            relations: ['organization']
        });
        //1. Find all expenses for organization which have splitExpense = true & all for the employee
        const { items, total } = await this.expenseService.findAllExpenses({
            where: [
                {
                    organizationId: employee.organization.id,
                    splitExpense: true
                },
                {
                    employee: {
                        id: employeeId
                    }
                }
            ],
            relations
        }, filterDate);
        //2. Find all employees of the organization
        const orgEmployees = await this.employeeService.findAll({
            where: {
                organizationId: employee.organization.id
            }
        });
        //3. Divide the value of the expense found in 1 to the no. of employees found in 2.
        const splitItems = items.map((e) => e.splitExpense
            ? {
                ...e,
                amount: +(e.amount /
                    (orgEmployees.total !== 0 ? orgEmployees.total : 1)).toFixed(2),
                originalValue: +e.amount,
                employeeCount: orgEmployees.total
            }
            : e);
        return { items: splitItems, total };
    }
};
exports.FindSplitExpenseHandler = FindSplitExpenseHandler = __decorate([
    (0, cqrs_1.QueryHandler)(expense_find_split_expense_query_1.FindSplitExpenseQuery),
    __metadata("design:paramtypes", [expense_service_1.ExpenseService,
        employee_service_1.EmployeeService])
], FindSplitExpenseHandler);
//# sourceMappingURL=expense.find-split-expense.handler.js.map