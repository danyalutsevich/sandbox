import { Repository } from 'typeorm';
import { CandidateExperience } from '../candidate-experience.entity';
export declare class TypeOrmCandidateExperienceRepository extends Repository<CandidateExperience> {
    readonly repository: Repository<CandidateExperience>;
    constructor(repository: Repository<CandidateExperience>);
}
