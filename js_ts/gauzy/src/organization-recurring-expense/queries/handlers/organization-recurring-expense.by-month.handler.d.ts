import { IQueryHandler } from '@nestjs/cqrs';
import { IPagination } from '../../../../plugins/contracts/dist/index';
import { FindRecurringExpenseByMonthHandler } from '../../../shared';
import { OrganizationRecurringExpenseService } from '../../organization-recurring-expense.service';
import { OrganizationRecurringExpenseByMonthQuery } from '../organization-recurring-expense.by-month.query';
import { OrganizationRecurringExpense } from '../../organization-recurring-expense.entity';
export declare class OrganizationRecurringExpenseByMonthHandler extends FindRecurringExpenseByMonthHandler<OrganizationRecurringExpense> implements IQueryHandler<OrganizationRecurringExpenseByMonthQuery> {
    private readonly organizationRecurringExpenseService;
    constructor(organizationRecurringExpenseService: OrganizationRecurringExpenseService);
    execute(command: OrganizationRecurringExpenseByMonthQuery): Promise<IPagination<OrganizationRecurringExpense>>;
}
