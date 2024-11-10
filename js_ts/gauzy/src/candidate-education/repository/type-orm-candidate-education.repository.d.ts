import { Repository } from 'typeorm';
import { CandidateEducation } from '../candidate-education.entity';
export declare class TypeOrmCandidateEducationRepository extends Repository<CandidateEducation> {
    readonly repository: Repository<CandidateEducation>;
    constructor(repository: Repository<CandidateEducation>);
}
