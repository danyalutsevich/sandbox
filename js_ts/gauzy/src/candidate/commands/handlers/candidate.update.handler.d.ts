import { ICommandHandler } from '@nestjs/cqrs';
import { ICandidate } from '../../../../plugins/contracts/dist/index';
import { CandidateService } from '../../candidate.service';
import { CandidateUpdateCommand } from '../candidate.update.command';
export declare class CandidateUpdateHandler implements ICommandHandler<CandidateUpdateCommand> {
    private readonly candidateService;
    constructor(candidateService: CandidateService);
    execute(command: CandidateUpdateCommand): Promise<ICandidate>;
}
