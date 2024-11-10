import { ICommandHandler } from '@nestjs/cqrs';
import { CandidatePersonalQualitiesBulkDeleteCommand } from '../candidate-personal-qualities.bulk.delete.command';
import { CandidatePersonalQualitiesService } from '../../candidate-personal-qualities.service';
export declare class CandidatePersonalQualitiesBulkDeleteHandler implements ICommandHandler<CandidatePersonalQualitiesBulkDeleteCommand> {
    private readonly candidatePersonalQualitiesService;
    constructor(candidatePersonalQualitiesService: CandidatePersonalQualitiesService);
    execute(command: CandidatePersonalQualitiesBulkDeleteCommand): Promise<any>;
}
