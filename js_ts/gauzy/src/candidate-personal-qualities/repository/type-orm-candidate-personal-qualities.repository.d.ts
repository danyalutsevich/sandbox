import { Repository } from 'typeorm';
import { CandidatePersonalQualities } from '../candidate-personal-qualities.entity';
export declare class TypeOrmCandidatePersonalQualitiesRepository extends Repository<CandidatePersonalQualities> {
    readonly repository: Repository<CandidatePersonalQualities>;
    constructor(repository: Repository<CandidatePersonalQualities>);
}
