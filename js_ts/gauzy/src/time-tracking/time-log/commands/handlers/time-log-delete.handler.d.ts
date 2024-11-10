import { ICommandHandler, CommandBus } from '@nestjs/cqrs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { TimeLogDeleteCommand } from '../time-log-delete.command';
import { TypeOrmTimeLogRepository } from '../../repository/type-orm-time-log.repository';
import { MikroOrmTimeLogRepository } from '../..//repository/mikro-orm-time-log.repository';
export declare class TimeLogDeleteHandler implements ICommandHandler<TimeLogDeleteCommand> {
    readonly typeOrmTimeLogRepository: TypeOrmTimeLogRepository;
    readonly mikroOrmTimeLogRepository: MikroOrmTimeLogRepository;
    private readonly commandBus;
    constructor(typeOrmTimeLogRepository: TypeOrmTimeLogRepository, mikroOrmTimeLogRepository: MikroOrmTimeLogRepository, commandBus: CommandBus);
    execute(command: TimeLogDeleteCommand): Promise<DeleteResult | UpdateResult>;
}
