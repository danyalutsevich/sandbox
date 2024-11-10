import { Repository } from 'typeorm';
import { EventType } from '../event-type.entity';
export declare class TypeOrmEventTypeRepository extends Repository<EventType> {
    readonly repository: Repository<EventType>;
    constructor(repository: Repository<EventType>);
}
