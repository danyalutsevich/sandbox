import { Repository } from 'typeorm';
import { GoalTimeFrame } from '../goal-time-frame.entity';
export declare class TypeOrmGoalTimeFrameRepository extends Repository<GoalTimeFrame> {
    readonly repository: Repository<GoalTimeFrame>;
    constructor(repository: Repository<GoalTimeFrame>);
}
