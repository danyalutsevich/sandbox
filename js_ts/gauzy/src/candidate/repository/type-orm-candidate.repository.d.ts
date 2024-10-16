import { Repository } from 'typeorm';
import { Candidate } from '../candidate.entity';
export declare class TypeOrmCandidateRepository extends Repository<Candidate> {
    readonly repository: Repository<Candidate>;
    constructor(repository: Repository<Candidate>);
}
