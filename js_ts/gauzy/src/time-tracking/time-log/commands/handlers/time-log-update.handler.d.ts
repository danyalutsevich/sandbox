import { ICommandHandler, CommandBus } from '@nestjs/cqrs';
import { TimeLog } from './../../time-log.entity';
import { TimeLogUpdateCommand } from '../time-log-update.command';
import { TimeSlotService } from '../../../time-slot/time-slot.service';
import { TypeOrmTimeLogRepository } from '../../repository/type-orm-time-log.repository';
import { TypeOrmTimeSlotRepository } from '../../../time-slot/repository/type-orm-time-slot.repository';
export declare class TimeLogUpdateHandler implements ICommandHandler<TimeLogUpdateCommand> {
    private readonly typeOrmTimeLogRepository;
    private readonly typeOrmTimeSlotRepository;
    private readonly commandBus;
    private readonly timeSlotService;
    constructor(typeOrmTimeLogRepository: TypeOrmTimeLogRepository, typeOrmTimeSlotRepository: TypeOrmTimeSlotRepository, commandBus: CommandBus, timeSlotService: TimeSlotService);
    execute(command: TimeLogUpdateCommand): Promise<TimeLog>;
}
