import { ICandidateSource } from '../../plugins/contracts/dist/index';
import { TenantAwareCrudService } from './../core/crud';
import { TypeOrmCandidateSourceRepository } from './repository/type-orm-candidate-source.repository';
import { MikroOrmCandidateSourceRepository } from './repository/mikro-orm-candidate-source.repository';
import { CandidateSource } from './candidate-source.entity';
export declare class CandidateSourceService extends TenantAwareCrudService<CandidateSource> {
    constructor(typeOrmCandidateSourceRepository: TypeOrmCandidateSourceRepository, mikroOrmCandidateSourceRepository: MikroOrmCandidateSourceRepository);
    /**
     *
     * @param sources
     * @returns
     */
    createBulk(sources: ICandidateSource[]): Promise<ICandidateSource[]>;
}
