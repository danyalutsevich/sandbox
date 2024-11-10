import { Repository } from 'typeorm';
import { CandidateInterview } from '../candidate-interview.entity';
export declare class TypeOrmCandidateInterviewRepository extends Repository<CandidateInterview> {
    readonly repository: Repository<CandidateInterview>;
    constructor(repository: Repository<CandidateInterview>);
}
