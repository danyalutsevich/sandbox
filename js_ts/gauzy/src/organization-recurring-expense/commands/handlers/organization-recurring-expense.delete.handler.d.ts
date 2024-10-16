import { ICommandHandler } from '@nestjs/cqrs';
import { RecurringExpenseDeleteHandler } from '../../../shared';
import { OrganizationRecurringExpense } from '../../organization-recurring-expense.entity';
import { OrganizationRecurringExpenseService } from '../../organization-recurring-expense.service';
import { OrganizationRecurringExpenseDeleteCommand } from '../organization-recurring-expense.delete.command';
/**
 * Deletes a OrganizationRecurringExpense based on RecurringExpenseDeleteHandler
 */
export declare class OrganizationRecurringExpenseDeleteHandler extends RecurringExpenseDeleteHandler<OrganizationRecurringExpense> implements ICommandHandler<OrganizationRecurringExpenseDeleteCommand> {
    private readonly organizationRecurringExpenseService;
    constructor(organizationRecurringExpenseService: OrganizationRecurringExpenseService);
    execute(command: OrganizationRecurringExpenseDeleteCommand): Promise<any>;
}
