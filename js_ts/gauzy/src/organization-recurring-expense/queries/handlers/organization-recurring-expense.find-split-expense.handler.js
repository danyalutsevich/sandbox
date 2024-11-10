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
exports.OrganizationRecurringExpenseFindSplitExpenseHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const employee_service_1 = require("../../../employee/employee.service");
const organization_service_1 = require("../../../organization/organization.service");
const organization_recurring_expense_service_1 = require("../../organization-recurring-expense.service");
const organization_recurring_expense_find_split_expense_query_1 = require("../organization-recurring-expense.find-split-expense.query");
const typeorm_1 = require("typeorm");
/**
 * Finds the split recurring expense for a given organization.
 *
 * 1. Find all recurring expenses for the organization which have splitExpense = true
 * 2. Find all employees of the organization (TODO: No. of employees CURRENTLY in the organization?)
 * 3. Divide the value of the expense found in 1 to the no. of employees found in 2 to 'split' the expense equally for all employees.
 */
let OrganizationRecurringExpenseFindSplitExpenseHandler = exports.OrganizationRecurringExpenseFindSplitExpenseHandler = class OrganizationRecurringExpenseFindSplitExpenseHandler {
    organizationRecurringExpenseService;
    organizationService;
    employeeService;
    constructor(organizationRecurringExpenseService, organizationService, employeeService) {
        this.organizationRecurringExpenseService = organizationRecurringExpenseService;
        this.organizationService = organizationService;
        this.employeeService = employeeService;
    }
    async execute(query) {
        const { orgId, findInput: { year, month } } = query;
        const filterDate = new Date(year, month, 1);
        //1. Find all recurring expenses for the organization which have splitExpense = true
        const { items, total } = await this.organizationRecurringExpenseService.findAll({
            where: [
                {
                    splitExpense: true,
                    organizationId: orgId,
                    startDate: (0, typeorm_1.LessThanOrEqual)(filterDate),
                    endDate: (0, typeorm_1.IsNull)()
                },
                {
                    splitExpense: true,
                    organizationId: orgId,
                    startDate: (0, typeorm_1.LessThanOrEqual)(filterDate),
                    endDate: (0, typeorm_1.MoreThanOrEqual)(filterDate)
                }
            ]
        });
        const organization = await this.organizationService.findOneByWhereOptions({
            id: orgId
        });
        //2. Find all employees of the organization
        const orgEmployees = await this.employeeService.findAll({
            where: {
                organizationId: organization.id
            }
        });
        //3. Divide the value of the expense found in 1 to the no. of employees found in 2 to 'split' the expense equally for all employees.
        const splitItems = items.map((e) => ({
            ...e,
            value: +(e.value / (orgEmployees.total !== 0 ? orgEmployees.total : 1)).toFixed(2),
            originalValue: +e.value,
            employeeCount: orgEmployees.total
        }));
        return { items: splitItems, total };
    }
};
exports.OrganizationRecurringExpenseFindSplitExpenseHandler = OrganizationRecurringExpenseFindSplitExpenseHandler = __decorate([
    (0, cqrs_1.QueryHandler)(organization_recurring_expense_find_split_expense_query_1.OrganizationRecurringExpenseFindSplitExpenseQuery),
    __metadata("design:paramtypes", [organization_recurring_expense_service_1.OrganizationRecurringExpenseService,
        organization_service_1.OrganizationService,
        employee_service_1.EmployeeService])
], OrganizationRecurringExpenseFindSplitExpenseHandler);
//# sourceMappingURL=organization-recurring-expense.find-split-expense.handler.js.map