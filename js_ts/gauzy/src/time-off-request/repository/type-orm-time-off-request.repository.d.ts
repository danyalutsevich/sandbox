import { Repository } from 'typeorm';
import { TimeOffRequest } from '../time-off-request.entity';
export declare class TypeOrmTimeOffRequestRepository extends Repository<TimeOffRequest> {
    readonly repository: Repository<TimeOffRequest>;
    constructor(repository: Repository<TimeOffRequest>);
}
