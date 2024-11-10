import { Repository } from 'typeorm';
import { TaskPriority } from '../priority.entity';
export declare class TypeOrmTaskPriorityRepository extends Repository<TaskPriority> {
    readonly repository: Repository<TaskPriority>;
    constructor(repository: Repository<TaskPriority>);
}
