import { Repository } from 'typeorm';
import { Expense } from '../expense.entity';
export declare class TypeOrmExpenseRepository extends Repository<Expense> {
    readonly repository: Repository<Expense>;
    constructor(repository: Repository<Expense>);
}
