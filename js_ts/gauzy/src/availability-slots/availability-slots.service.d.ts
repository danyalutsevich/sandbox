import { IAvailabilitySlot, IAvailabilitySlotsCreateInput } from '../../plugins/contracts/dist/index';
import { TenantAwareCrudService } from './../core/crud';
import { TypeOrmAvailabilitySlotRepository } from './repository/type-orm-availability-slot.repository';
import { MikroOrmAvailabilitySlotRepository } from './repository/mikro-orm-availability-slot.repository';
import { AvailabilitySlot } from './availability-slots.entity';
export declare class AvailabilitySlotsService extends TenantAwareCrudService<AvailabilitySlot> {
    constructor(typeOrmAvailabilitySlotRepository: TypeOrmAvailabilitySlotRepository, mikroOrmAvailabilitySlotRepository: MikroOrmAvailabilitySlotRepository);
    /**
     *
     * @param availabilitySlots
     * @returns
     */
    createBulk(availabilitySlots: IAvailabilitySlotsCreateInput[]): Promise<IAvailabilitySlot[]>;
}
