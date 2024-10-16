import { CommandBus } from '@nestjs/cqrs';
import { IGetTimeSlotInput, ITimeSlot } from '../../../plugins/contracts';
import { TenantAwareCrudService } from './../../core/crud';
import { TimeSlot } from './time-slot.entity';
import { TimeSlotMinute } from './time-slot-minute.entity';
import { TypeOrmTimeSlotRepository } from './repository/type-orm-time-slot.repository';
import { MikroOrmTimeSlotRepository } from './repository/mikro-orm-time-slot.repository';
export declare class TimeSlotService extends TenantAwareCrudService<TimeSlot> {
    readonly typeOrmTimeSlotRepository: TypeOrmTimeSlotRepository;
    readonly mikroOrmTimeSlotRepository: MikroOrmTimeSlotRepository;
    private readonly commandBus;
    constructor(typeOrmTimeSlotRepository: TypeOrmTimeSlotRepository, mikroOrmTimeSlotRepository: MikroOrmTimeSlotRepository, commandBus: CommandBus);
    /**
     * Retrieves time slots based on the provided input parameters.
     * @param request - Input parameters for querying time slots.
     * @returns A list of time slots matching the specified criteria.
     */
    getTimeSlots(request: IGetTimeSlotInput): Promise<TimeSlot[]>;
    /**
     *
     * @param slots
     * @param employeeId
     * @param organizationId
     * @returns
     */
    bulkCreateOrUpdate(slots: ITimeSlot[], employeeId: ITimeSlot['employeeId'], organizationId: ITimeSlot['organizationId']): Promise<any>;
    /**
     *
     * @param slots
     * @param employeeId
     * @param organizationId
     * @returns
     */
    bulkCreate(slots: ITimeSlot[], employeeId: ITimeSlot['employeeId'], organizationId: ITimeSlot['organizationId']): Promise<any>;
    /**
     *
     * @param start
     * @param end
     * @returns
     */
    generateTimeSlots(start: Date, end: Date): any[];
    createTimeSlotMinute(request: TimeSlotMinute): Promise<any>;
    updateTimeSlotMinute(id: string, request: TimeSlotMinute): Promise<any>;
}
