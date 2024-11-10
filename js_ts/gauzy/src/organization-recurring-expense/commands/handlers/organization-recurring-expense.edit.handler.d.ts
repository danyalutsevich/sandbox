import { ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { RecurringExpenseEditHandler } from '../../../shared';
import { OrganizationRecurringExpense } from '../../organization-recurring-expense.entity';
import { OrganizationRecurringExpenseService } from '../../organization-recurring-expense.service';
import { OrganizationRecurringExpenseEditCommand } from '../organization-recurring-expense.edit.command';
/**
 * This edits a recurring expense.
 * To edit a recurring expense
 * 1. Change the end date of the original expense so that old value is not modified for previous expense.
 * 2. Create a new expense to have new values for all future dates.
 */
export declare class OrganizationRecurringExpenseEditHandler extends RecurringExpenseEditHandler<OrganizationRecurringExpense> implements ICommandHandler<OrganizationRecurringExpenseEditCommand> {
    private readonly organizationRecurringExpenseService;
    private readonly queryBus;
    constructor(organizationRecurringExpenseService: OrganizationRecurringExpenseService, queryBus: QueryBus);
    execute(command: OrganizationRecurringExpenseEditCommand): Promise<any>;
}
