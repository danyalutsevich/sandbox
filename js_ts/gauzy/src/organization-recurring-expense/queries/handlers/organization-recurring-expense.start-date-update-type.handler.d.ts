import { IStartUpdateTypeInfo } from '../../../../plugins/contracts/dist/index';
import { IQueryHandler } from '@nestjs/cqrs';
import { FindRecurringExpenseStartDateUpdateTypeHandler } from '../../../shared/handlers/recurring-expense.find-update-type.handler';
import { OrganizationRecurringExpense } from '../../organization-recurring-expense.entity';
import { OrganizationRecurringExpenseService } from '../../organization-recurring-expense.service';
import { OrganizationRecurringExpenseStartDateUpdateTypeQuery } from '../organization-recurring-expense.update-type.query';
export declare class OrganizationRecurringExpenseUpdateTypeHandler extends FindRecurringExpenseStartDateUpdateTypeHandler<OrganizationRecurringExpense> implements IQueryHandler<OrganizationRecurringExpenseStartDateUpdateTypeQuery> {
    private readonly organizationRecurringExpenseService;
    constructor(organizationRecurringExpenseService: OrganizationRecurringExpenseService);
    execute(command: OrganizationRecurringExpenseStartDateUpdateTypeQuery): Promise<IStartUpdateTypeInfo>;
}
