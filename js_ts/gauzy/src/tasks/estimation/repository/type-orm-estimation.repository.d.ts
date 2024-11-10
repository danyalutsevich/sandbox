import { Repository } from 'typeorm';
import { TaskEstimation } from '../task-estimation.entity';
export declare class TypeOrmTaskEstimationRepository extends Repository<TaskEstimation> {
    readonly repository: Repository<TaskEstimation>;
    constructor(repository: Repository<TaskEstimation>);
}
