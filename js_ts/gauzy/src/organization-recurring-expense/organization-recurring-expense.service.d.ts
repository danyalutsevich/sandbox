import { TenantAwareCrudService } from './../core/crud';
import { OrganizationRecurringExpense } from './organization-recurring-expense.entity';
import { TypeOrmOrganizationRecurringExpenseRepository } from './repository/type-orm-organization-recurring-expense.repository';
import { MikroOrmOrganizationRecurringExpenseRepository } from './repository/mikro-orm-organization-recurring-expense.repository';
export declare class OrganizationRecurringExpenseService extends TenantAwareCrudService<OrganizationRecurringExpense> {
    constructor(typeOrmOrganizationRecurringExpenseRepository: TypeOrmOrganizationRecurringExpenseRepository, mikroOrmOrganizationRecurringExpenseRepository: MikroOrmOrganizationRecurringExpenseRepository);
}
