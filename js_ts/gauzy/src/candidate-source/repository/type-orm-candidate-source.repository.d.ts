import { Repository } from 'typeorm';
import { CandidateSource } from '../candidate-source.entity';
export declare class TypeOrmCandidateSourceRepository extends Repository<CandidateSource> {
    readonly repository: Repository<CandidateSource>;
    constructor(repository: Repository<CandidateSource>);
}
