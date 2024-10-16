import { Repository } from 'typeorm';
import { TimeLog } from '../time-log.entity';
export declare class TypeOrmTimeLogRepository extends Repository<TimeLog> {
    readonly repository: Repository<TimeLog>;
    constructor(repository: Repository<TimeLog>);
}
