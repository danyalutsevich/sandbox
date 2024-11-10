import { Repository } from 'typeorm';
import { TimeSlotMinute } from '../time-slot-minute.entity';
export declare class TypeOrmTimeSlotMinuteRepository extends Repository<TimeSlotMinute> {
    readonly repository: Repository<TimeSlotMinute>;
    constructor(repository: Repository<TimeSlotMinute>);
}
