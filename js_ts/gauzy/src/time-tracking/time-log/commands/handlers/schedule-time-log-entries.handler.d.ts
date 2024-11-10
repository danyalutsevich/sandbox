import { ICommandHandler } from '@nestjs/cqrs';
import { ScheduleTimeLogEntriesCommand } from '../schedule-time-log-entries.command';
import { TypeOrmTimeLogRepository } from '../../repository/type-orm-time-log.repository';
export declare class ScheduleTimeLogEntriesHandler implements ICommandHandler<ScheduleTimeLogEntriesCommand> {
    private readonly typeOrmTimeLogRepository;
    constructor(typeOrmTimeLogRepository: TypeOrmTimeLogRepository);
    execute(command: ScheduleTimeLogEntriesCommand): Promise<void>;
}
