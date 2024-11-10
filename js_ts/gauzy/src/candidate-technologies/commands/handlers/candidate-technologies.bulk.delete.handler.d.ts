import { ICommandHandler } from '@nestjs/cqrs';
import { CandidateTechnologiesBulkDeleteCommand } from '../candidate-technologies.bulk.delete.command';
import { CandidateTechnologiesService } from '../../candidate-technologies.service';
export declare class CandidateTechnologiesBulkDeleteHandler implements ICommandHandler<CandidateTechnologiesBulkDeleteCommand> {
    private readonly candidateTechnologiesService;
    constructor(candidateTechnologiesService: CandidateTechnologiesService);
    execute(command: CandidateTechnologiesBulkDeleteCommand): Promise<any>;
}
