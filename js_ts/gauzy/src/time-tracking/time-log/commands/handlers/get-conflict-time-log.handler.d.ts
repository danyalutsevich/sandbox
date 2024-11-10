import { ICommandHandler } from '@nestjs/cqrs';
import { ConfigService } from '../../../../../plugins/config/dist/index';
import { TimeLog } from './../../time-log.entity';
import { IGetConflictTimeLogCommand } from '../get-conflict-time-log.command';
import { TypeOrmTimeLogRepository } from '../../repository/type-orm-time-log.repository';
export declare class GetConflictTimeLogHandler implements ICommandHandler<IGetConflictTimeLogCommand> {
    private readonly typeOrmTimeLogRepository;
    private readonly configService;
    constructor(typeOrmTimeLogRepository: TypeOrmTimeLogRepository, configService: ConfigService);
    execute(command: IGetConflictTimeLogCommand): Promise<TimeLog[]>;
}
