import { Repository } from 'typeorm';
import { GoalKPI } from '../goal-kpi.entity';
export declare class TypeOrmGoalKPIRepository extends Repository<GoalKPI> {
    readonly repository: Repository<GoalKPI>;
    constructor(repository: Repository<GoalKPI>);
}
