import { ICommandHandler } from '@nestjs/cqrs';
import { TimeOffStatusCommand } from '../time-off.status.command';
import { TimeOffRequest } from '../../time-off-request.entity';
import { TypeOrmTimeOffRequestRepository } from '../../repository/type-orm-time-off-request.repository';
import { TypeOrmRequestApprovalRepository } from '../../../request-approval/repository/type-orm-request-approval.repository';
export declare class TimeOffStatusHandler implements ICommandHandler<TimeOffStatusCommand> {
    private readonly typeOrmTimeOffRequestRepository;
    private readonly typeOrmRequestApprovalRepository;
    constructor(typeOrmTimeOffRequestRepository: TypeOrmTimeOffRequestRepository, typeOrmRequestApprovalRepository: TypeOrmRequestApprovalRepository);
    execute(command?: TimeOffStatusCommand): Promise<TimeOffRequest>;
}
