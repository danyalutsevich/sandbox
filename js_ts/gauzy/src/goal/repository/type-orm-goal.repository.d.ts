import { Repository } from 'typeorm';
import { Goal } from '../goal.entity';
export declare class TypeOrmGoalRepository extends Repository<Goal> {
    readonly repository: Repository<Goal>;
    constructor(repository: Repository<Goal>);
}
