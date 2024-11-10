import { ICommandHandler, CommandBus } from '@nestjs/cqrs';
import { TimeLog } from './../../time-log.entity';
import { TimeLogCreateCommand } from '../time-log-create.command';
import { TimeSlotService } from '../../../time-slot/time-slot.service';
import { TypeOrmTimeLogRepository } from '../../repository/type-orm-time-log.repository';
import { MikroOrmTimeLogRepository } from '../../repository/mikro-orm-time-log.repository';
export declare class TimeLogCreateHandler implements ICommandHandler<TimeLogCreateCommand> {
    readonly typeOrmTimeLogRepository: TypeOrmTimeLogRepository;
    readonly mikroOrmTimeLogRepository: MikroOrmTimeLogRepository;
    private readonly commandBus;
    private readonly timeSlotService;
    constructor(typeOrmTimeLogRepository: TypeOrmTimeLogRepository, mikroOrmTimeLogRepository: MikroOrmTimeLogRepository, commandBus: CommandBus, timeSlotService: TimeSlotService);
    execute(command: TimeLogCreateCommand): Promise<TimeLog>;
}
