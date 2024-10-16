import { Repository } from 'typeorm';
import { ExpenseCategory } from '../expense-category.entity';
export declare class TypeOrmExpenseCategoryRepository extends Repository<ExpenseCategory> {
    readonly repository: Repository<ExpenseCategory>;
    constructor(repository: Repository<ExpenseCategory>);
}
