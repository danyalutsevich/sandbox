import { FindManyOptions } from 'typeorm';
import { IPagination } from '../../plugins/contracts/dist/index';
import { Income } from './income.entity';
import { TenantAwareCrudService } from './../core/crud';
import { MikroOrmIncomeRepository } from './repository/mikro-orm-income.repository';
import { TypeOrmIncomeRepository } from './repository/type-orm-income.repository';
export declare class IncomeService extends TenantAwareCrudService<Income> {
    constructor(typeOrmIncomeRepository: TypeOrmIncomeRepository, mikroOrmIncomeRepository: MikroOrmIncomeRepository);
    findAllIncomes(filter?: FindManyOptions<Income>, filterDate?: string): Promise<IPagination<Income>>;
    countStatistic(data: number[]): number;
    pagination(filter: FindManyOptions): Promise<IPagination<Income>>;
}
