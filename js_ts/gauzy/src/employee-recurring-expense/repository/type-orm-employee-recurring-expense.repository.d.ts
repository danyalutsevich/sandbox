import { Repository } from 'typeorm';
import { EmployeeRecurringExpense } from '../employee-recurring-expense.entity';
export declare class TypeOrmEmployeeRecurringExpenseRepository extends Repository<EmployeeRecurringExpense> {
    readonly repository: Repository<EmployeeRecurringExpense>;
    constructor(repository: Repository<EmployeeRecurringExpense>);
}
