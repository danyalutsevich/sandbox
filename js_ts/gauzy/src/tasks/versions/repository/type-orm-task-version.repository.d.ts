import { Repository } from 'typeorm';
import { TaskVersion } from '../version.entity';
export declare class TypeOrmTaskVersionRepository extends Repository<TaskVersion> {
    readonly repository: Repository<TaskVersion>;
    constructor(repository: Repository<TaskVersion>);
}
