import { Repository } from 'typeorm';
import { AvailabilitySlot } from '../availability-slots.entity';
export declare class TypeOrmAvailabilitySlotRepository extends Repository<AvailabilitySlot> {
    readonly repository: Repository<AvailabilitySlot>;
    constructor(repository: Repository<AvailabilitySlot>);
}
