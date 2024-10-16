import { ICommandHandler } from '@nestjs/cqrs';
import { CandidateTechnologiesService } from '../../candidate-technologies.service';
import { CandidateTechnologiesBulkUpdateCommand } from '../candidate-technologies.bulk.update.command';
export declare class CandidateTechnologiesBulkUpdateHandler implements ICommandHandler<CandidateTechnologiesBulkUpdateCommand> {
    private readonly candidateTechnologiesService;
    constructor(candidateTechnologiesService: CandidateTechnologiesService);
    execute(command: CandidateTechnologiesBulkUpdateCommand): Promise<any>;
}
