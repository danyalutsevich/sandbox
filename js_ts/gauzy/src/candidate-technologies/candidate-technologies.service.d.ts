import { ICandidateTechnologies, ICandidateTechnologiesCreateInput } from '../../plugins/contracts/dist/index';
import { TenantAwareCrudService } from './../core/crud';
import { CandidateTechnologies } from './candidate-technologies.entity';
import { TypeOrmCandidateTechnologiesRepository } from './repository/type-orm-candidate-technologies.repository';
import { MikroOrmCandidateTechnologiesRepository } from './repository/mikro-orm-candidate-technologies.repository';
export declare class CandidateTechnologiesService extends TenantAwareCrudService<CandidateTechnologies> {
    constructor(typeOrmCandidateTechnologiesRepository: TypeOrmCandidateTechnologiesRepository, mikroOrmCandidateTechnologiesRepository: MikroOrmCandidateTechnologiesRepository);
    /**
     *
     * @param createInput
     * @returns
     */
    createBulk(createInput: ICandidateTechnologiesCreateInput[]): Promise<(ICandidateTechnologiesCreateInput & CandidateTechnologies)[]>;
    /**
     *
     * @param interviewId
     * @returns
     */
    getTechnologiesByInterviewId(interviewId: string): Promise<ICandidateTechnologies[]>;
    /**
     *
     * @param ids
     * @returns
     */
    deleteBulk(ids: string[]): Promise<import("typeorm").DeleteResult>;
}
