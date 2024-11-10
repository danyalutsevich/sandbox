import { Repository } from 'typeorm';
import { TaskSize } from '../size.entity';
export declare class TypeOrmTaskSizeRepository extends Repository<TaskSize> {
    readonly repository: Repository<TaskSize>;
    constructor(repository: Repository<TaskSize>);
}
