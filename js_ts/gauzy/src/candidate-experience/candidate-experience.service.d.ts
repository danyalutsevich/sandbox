import { IPagination } from '../../plugins/contracts/dist/index';
import { FindManyOptions } from 'typeorm';
import { TenantAwareCrudService } from './../core/crud';
import { CandidateExperience } from './candidate-experience.entity';
import { TypeOrmCandidateExperienceRepository } from './repository/type-orm-candidate-experience.repository';
import { MikroOrmCandidateExperienceRepository } from './repository/mikro-orm-candidate-experience.repository';
export declare class CandidateExperienceService extends TenantAwareCrudService<CandidateExperience> {
    constructor(typeOrmCandidateExperienceRepository: TypeOrmCandidateExperienceRepository, mikroOrmCandidateExperienceRepository: MikroOrmCandidateExperienceRepository);
    /**
     *
     * @param filter
     * @returns
     */
    findAll(filter?: FindManyOptions<CandidateExperience>): Promise<IPagination<CandidateExperience>>;
}
