import { ICommandHandler } from '@nestjs/cqrs';
import { CandidatePersonalQualitiesBulkCreateCommand } from '../candidate-personal-qualities.bulk.create.command';
import { CandidatePersonalQualitiesService } from '../../candidate-personal-qualities.service';
import { CandidatePersonalQualities } from '../../candidate-personal-qualities.entity';
export declare class CandidatePersonalQualitiesBulkCreateHandler implements ICommandHandler<CandidatePersonalQualitiesBulkCreateCommand> {
    private readonly candidatePersonalQualitiesService;
    constructor(candidatePersonalQualitiesService: CandidatePersonalQualitiesService);
    execute(command: CandidatePersonalQualitiesBulkCreateCommand): Promise<CandidatePersonalQualities[]>;
}
