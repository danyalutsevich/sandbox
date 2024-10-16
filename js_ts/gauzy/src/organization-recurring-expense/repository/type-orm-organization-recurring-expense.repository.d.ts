import { Repository } from 'typeorm';
import { OrganizationRecurringExpense } from '../organization-recurring-expense.entity';
export declare class TypeOrmOrganizationRecurringExpenseRepository extends Repository<OrganizationRecurringExpense> {
    readonly repository: Repository<OrganizationRecurringExpense>;
    constructor(repository: Repository<OrganizationRecurringExpense>);
}
