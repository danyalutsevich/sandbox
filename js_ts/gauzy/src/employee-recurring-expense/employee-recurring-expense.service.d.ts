import { TenantAwareCrudService } from './../core/crud';
import { EmployeeRecurringExpense } from './employee-recurring-expense.entity';
import { TypeOrmEmployeeRecurringExpenseRepository } from './repository/type-orm-employee-recurring-expense.repository';
import { MikroOrmEmployeeRecurringExpenseRepository } from './repository/mikro-orm-employee-recurring-expense.repository';
export declare class EmployeeRecurringExpenseService extends TenantAwareCrudService<EmployeeRecurringExpense> {
    constructor(typeOrmEmployeeRecurringExpenseRepository: TypeOrmEmployeeRecurringExpenseRepository, mikroOrmEmployeeRecurringExpenseRepository: MikroOrmEmployeeRecurringExpenseRepository);
}
