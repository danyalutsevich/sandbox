import { Repository } from 'typeorm';
import { CandidateInterviewers } from '../candidate-interviewers.entity';
export declare class TypeOrmCandidateInterviewersRepository extends Repository<CandidateInterviewers> {
    readonly repository: Repository<CandidateInterviewers>;
    constructor(repository: Repository<CandidateInterviewers>);
}
