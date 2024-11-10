import { Repository } from 'typeorm';
import { TimeSlot } from '../time-slot.entity';
export declare class TypeOrmTimeSlotRepository extends Repository<TimeSlot> {
    readonly repository: Repository<TimeSlot>;
    constructor(repository: Repository<TimeSlot>);
}
