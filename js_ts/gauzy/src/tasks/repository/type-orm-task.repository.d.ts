import { Repository } from 'typeorm';
import { Task } from '../task.entity';
export declare class TypeOrmTaskRepository extends Repository<Task> {
    readonly repository: Repository<Task>;
    constructor(repository: Repository<Task>);
}
