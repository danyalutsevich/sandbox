import { ICommandHandler } from '@nestjs/cqrs';
import { CandidateTechnologiesBulkCreateCommand } from '../candidate-technologies.bulk.create.command';
import { CandidateTechnologiesService } from '../../candidate-technologies.service';
import { CandidateTechnologies } from '../../candidate-technologies.entity';
export declare class CandidateTechnologiesBulkCreateHandler implements ICommandHandler<CandidateTechnologiesBulkCreateCommand> {
    private readonly candidateTechnologiesService;
    constructor(candidateTechnologiesService: CandidateTechnologiesService);
    execute(command: CandidateTechnologiesBulkCreateCommand): Promise<CandidateTechnologies[]>;
}
