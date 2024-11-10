import { FindManyOptions } from 'typeorm';
import { IGetExpenseInput, IPagination } from '../../plugins/contracts/dist/index';
import { Expense } from './expense.entity';
import { TenantAwareCrudService } from './../core/crud';
import { TypeOrmExpenseRepository } from './repository/type-orm-expense.repository';
import { MikroOrmExpenseRepository } from './repository/mikro-orm-expense.repository';
export declare class ExpenseService extends TenantAwareCrudService<Expense> {
    constructor(typeOrmExpenseRepository: TypeOrmExpenseRepository, mikroOrmExpenseRepository: MikroOrmExpenseRepository);
    /**
     *
     * @param filter
     * @param filterDate
     * @returns
     */
    findAllExpenses(filter?: FindManyOptions<Expense>, filterDate?: string): Promise<IPagination<Expense>>;
    /**
     *
     * @param data
     * @returns
     */
    countStatistic(data: number[]): number;
    /**
     *
     * @param request
     * @returns
     */
    getExpense(request: IGetExpenseInput): Promise<Expense[]>;
    /**
     *
     * @param request
     * @returns
     */
    getDailyReportChartData(request: IGetExpenseInput): Promise<{
        date: string;
        value: {
            expense: any;
        };
    }[]>;
    /**
     *
     * @param request
     * @returns
     */
    private filterQuery;
    /**
     *
     * @param filter
     * @returns
     */
    pagination(filter: FindManyOptions): Promise<IPagination<Expense>>;
}
