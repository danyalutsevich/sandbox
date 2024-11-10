import { CommandBus, ICommandHandler } from '@nestjs/cqrs';
import { TimeSlot } from './../../time-slot.entity';
import { TimeSlotBulkCreateCommand } from './../time-slot-bulk-create.command';
import { TypeOrmTimeSlotRepository } from '../../repository/type-orm-time-slot.repository';
import { TypeOrmTimeLogRepository } from '../../../time-log/repository/type-orm-time-log.repository';
export declare class TimeSlotBulkCreateHandler implements ICommandHandler<TimeSlotBulkCreateCommand> {
    private readonly typeOrmTimeLogRepository;
    private readonly typeOrmTimeSlotRepository;
    private readonly commandBus;
    constructor(typeOrmTimeLogRepository: TypeOrmTimeLogRepository, typeOrmTimeSlotRepository: TypeOrmTimeSlotRepository, commandBus: CommandBus);
    execute(command: TimeSlotBulkCreateCommand): Promise<TimeSlot[]>;
}
