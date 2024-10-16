import { CommandBus } from '@nestjs/cqrs';
import { DeleteResult, FindOneOptions, UpdateResult } from 'typeorm';
import { ITimeSlot } from '../../../plugins/contracts';
import { TimeSlotService } from './time-slot.service';
import { TimeSlot } from './time-slot.entity';
import { DeleteTimeSlotDTO } from './dto';
import { TimeSlotQueryDTO } from './dto/query';
export declare class TimeSlotController {
    private readonly timeSlotService;
    private readonly commandBus;
    constructor(timeSlotService: TimeSlotService, commandBus: CommandBus);
    /**
     *
     * @param options
     * @returns
     */
    findAll(options: TimeSlotQueryDTO): Promise<ITimeSlot[]>;
    /**
     *
     * @param id
     * @param options
     * @returns
     */
    findById(id: ITimeSlot['id'], options: FindOneOptions): Promise<ITimeSlot>;
    /**
     *
     * @param entity
     * @returns
     */
    create(requst: ITimeSlot): Promise<ITimeSlot>;
    /**
     *
     * @param id
     * @param entity
     * @returns
     */
    update(id: ITimeSlot['id'], request: TimeSlot): Promise<ITimeSlot>;
    /**
     *
     * @param query
     * @returns
     */
    deleteTimeSlot(query: DeleteTimeSlotDTO): Promise<DeleteResult | UpdateResult>;
}
