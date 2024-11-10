import { ICommandHandler } from '@nestjs/cqrs';
import { ScheduleTimeSlotEntriesCommand } from '../schedule-time-slot-entries.command';
import { TypeOrmTimeSlotRepository } from '../../repository/type-orm-time-slot.repository';
export declare class ScheduleTimeSlotEntriesHandler implements ICommandHandler<ScheduleTimeSlotEntriesCommand> {
    private readonly typeOrmTimeSlotRepository;
    constructor(typeOrmTimeSlotRepository: TypeOrmTimeSlotRepository);
    /**
     *
     * @param command
     */
    execute(command: ScheduleTimeSlotEntriesCommand): Promise<void>;
}
