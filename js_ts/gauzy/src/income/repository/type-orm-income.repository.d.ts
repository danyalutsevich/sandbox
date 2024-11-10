import { Repository } from 'typeorm';
import { Income } from '../income.entity';
export declare class TypeOrmIncomeRepository extends Repository<Income> {
    readonly repository: Repository<Income>;
    constructor(repository: Repository<Income>);
}
