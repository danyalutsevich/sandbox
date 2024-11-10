import { ICandidate, ICandidateInterview } from '../../plugins/contracts/dist/index';
import { TenantAwareCrudService } from './../core/crud';
import { TypeOrmCandidateInterviewRepository } from './repository/type-orm-candidate-interview.repository';
import { MikroOrmCandidateInterviewRepository } from './repository/mikro-orm-candidate-interview.repository';
import { CandidateInterview } from './candidate-interview.entity';
export declare class CandidateInterviewService extends TenantAwareCrudService<CandidateInterview> {
    constructor(typeOrmCandidateInterviewRepository: TypeOrmCandidateInterviewRepository, mikroOrmCandidateInterviewRepository: MikroOrmCandidateInterviewRepository);
    /**
     *
     * @param candidateId
     * @returns
     */
    findByCandidateId(candidateId: ICandidate['id']): Promise<ICandidateInterview[]>;
}
