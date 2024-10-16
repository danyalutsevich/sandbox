import { Repository } from 'typeorm';
import { CandidateTechnologies } from '../candidate-technologies.entity';
export declare class TypeOrmCandidateTechnologiesRepository extends Repository<CandidateTechnologies> {
    readonly repository: Repository<CandidateTechnologies>;
    constructor(repository: Repository<CandidateTechnologies>);
}
