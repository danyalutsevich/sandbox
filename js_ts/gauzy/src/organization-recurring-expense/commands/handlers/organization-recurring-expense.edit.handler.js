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
exports.OrganizationRecurringExpenseEditHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const shared_1 = require("../../../shared");
const organization_recurring_expense_service_1 = require("../../organization-recurring-expense.service");
const organization_recurring_expense_update_type_query_1 = require("../../queries/organization-recurring-expense.update-type.query");
const organization_recurring_expense_edit_command_1 = require("../organization-recurring-expense.edit.command");
/**
 * This edits a recurring expense.
 * To edit a recurring expense
 * 1. Change the end date of the original expense so that old value is not modified for previous expense.
 * 2. Create a new expense to have new values for all future dates.
 */
let OrganizationRecurringExpenseEditHandler = exports.OrganizationRecurringExpenseEditHandler = class OrganizationRecurringExpenseEditHandler extends shared_1.RecurringExpenseEditHandler {
    organizationRecurringExpenseService;
    queryBus;
    constructor(organizationRecurringExpenseService, queryBus) {
        super(organizationRecurringExpenseService);
        this.organizationRecurringExpenseService = organizationRecurringExpenseService;
        this.queryBus = queryBus;
    }
    async execute(command) {
        const { id, input } = command;
        const updateType = await this.queryBus.execute(new organization_recurring_expense_update_type_query_1.OrganizationRecurringExpenseStartDateUpdateTypeQuery({
            newStartDate: new Date(input.startYear, input.startMonth, input.startDay),
            recurringExpenseId: id
        }));
        return await this.executeCommand(id, {
            ...input,
            startDateUpdateType: updateType.value
        });
    }
};
exports.OrganizationRecurringExpenseEditHandler = OrganizationRecurringExpenseEditHandler = __decorate([
    (0, cqrs_1.CommandHandler)(organization_recurring_expense_edit_command_1.OrganizationRecurringExpenseEditCommand),
    __metadata("design:paramtypes", [organization_recurring_expense_service_1.OrganizationRecurringExpenseService,
        cqrs_1.QueryBus])
], OrganizationRecurringExpenseEditHandler);
//# sourceMappingURL=organization-recurring-expense.edit.handler.js.map