import { CommandBus, ICommandHandler } from '@nestjs/cqrs';
import { ICandidate } from '../../../../plugins/contracts/dist/index';
import { CandidateBulkCreateCommand } from '../candidate.bulk.create.command';
export declare class CandidateBulkCreateHandler implements ICommandHandler<CandidateBulkCreateCommand> {
    private readonly _commandBus;
    constructor(_commandBus: CommandBus);
    execute(command: CandidateBulkCreateCommand): Promise<ICandidate[]>;
}
