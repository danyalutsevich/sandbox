import { TenantAwareCrudService } from './../core/crud';
import { TypeOrmExpenseCategoryRepository } from './repository/type-orm-expense-category.repository';
import { MikroOrmExpenseCategoryRepository } from './repository/mikro-orm-expense-category.repository';
import { ExpenseCategory } from './expense-category.entity';
export declare class ExpenseCategoriesService extends TenantAwareCrudService<ExpenseCategory> {
    constructor(typeOrmExpenseCategoryRepository: TypeOrmExpenseCategoryRepository, mikroOrmExpenseCategoryRepository: MikroOrmExpenseCategoryRepository);
}
