import { ICandidateExperience, IPagination } from '../../plugins/contracts/dist/index';
import { UpdateResult } from 'typeorm';
import { CrudController, PaginationParams } from './../core/crud';
import { CandidateExperienceService } from './candidate-experience.service';
import { CandidateExperience } from './candidate-experience.entity';
import { CreateCandidateExperienceDTO, UpdateCandidateExperienceDTO } from './dto';
export declare class CandidateExperienceController extends CrudController<CandidateExperience> {
    private readonly candidateExperienceService;
    constructor(candidateExperienceService: CandidateExperienceService);
    /**
     * GET candidate experiences by pagination
     *
     * @param params
     * @returns
     */
    pagination(params: PaginationParams<CandidateExperience>): Promise<IPagination<ICandidateExperience>>;
    /**
     * GET candidate experiences
     *
     * @param params
     * @returns
     */
    findAll(params: PaginationParams<CandidateExperience>): Promise<IPagination<ICandidateExperience>>;
    /**
     * CREATE candidate experience
     *
     * @param entity
     * @returns
     */
    create(entity: CreateCandidateExperienceDTO): Promise<ICandidateExperience>;
    /**
     * UPDATE candidate experience
     *
     * @param entity
     * @returns
     */
    update(id: ICandidateExperience['id'], entity: UpdateCandidateExperienceDTO): Promise<ICandidateExperience | UpdateResult>;
}
