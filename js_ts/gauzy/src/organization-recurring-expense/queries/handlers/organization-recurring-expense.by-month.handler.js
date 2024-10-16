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
exports.OrganizationRecurringExpenseByMonthHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const shared_1 = require("../../../shared");
const organization_recurring_expense_service_1 = require("../../organization-recurring-expense.service");
const organization_recurring_expense_by_month_query_1 = require("../organization-recurring-expense.by-month.query");
let OrganizationRecurringExpenseByMonthHandler = exports.OrganizationRecurringExpenseByMonthHandler = class OrganizationRecurringExpenseByMonthHandler extends shared_1.FindRecurringExpenseByMonthHandler {
    organizationRecurringExpenseService;
    constructor(organizationRecurringExpenseService) {
        super(organizationRecurringExpenseService);
        this.organizationRecurringExpenseService = organizationRecurringExpenseService;
    }
    async execute(command) {
        const { input } = command;
        const recurringExpenses = await this.executeCommand(input);
        return recurringExpenses;
    }
};
exports.OrganizationRecurringExpenseByMonthHandler = OrganizationRecurringExpenseByMonthHandler = __decorate([
    (0, cqrs_1.QueryHandler)(organization_recurring_expense_by_month_query_1.OrganizationRecurringExpenseByMonthQuery),
    __metadata("design:paramtypes", [organization_recurring_expense_service_1.OrganizationRecurringExpenseService])
], OrganizationRecurringExpenseByMonthHandler);
//# sourceMappingURL=organization-recurring-expense.by-month.handler.js.map