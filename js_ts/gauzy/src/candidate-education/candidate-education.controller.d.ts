import { UpdateResult } from 'typeorm';
import { ICandidateEducation, IPagination } from '../../plugins/contracts/dist/index';
import { CrudController, PaginationParams } from './../core/crud';
import { CandidateEducationService } from './candidate-education.service';
import { CandidateEducation } from './candidate-education.entity';
import { CreateCandidateEducationDTO, UpdateCandidateEducationDTO } from './dto';
export declare class CandidateEducationController extends CrudController<CandidateEducation> {
    private readonly candidateEducationService;
    constructor(candidateEducationService: CandidateEducationService);
    /**
     * GET candidate educations by pagination
     *
     * @param params
     * @returns
     */
    pagination(params: PaginationParams<CandidateEducation>): Promise<IPagination<ICandidateEducation>>;
    /**
     * GET candidate educations
     *
     * @param params
     * @returns
     */
    findAll(params: PaginationParams<CandidateEducation>): Promise<IPagination<ICandidateEducation>>;
    /**
     * CREATE candidate education
     *
     * @param entity
     * @returns
     */
    create(entity: CreateCandidateEducationDTO): Promise<ICandidateEducation>;
    /**
     * UPDATE candidate education
     *
     * @param entity
     * @returns
     */
    update(id: ICandidateEducation['id'], entity: UpdateCandidateEducationDTO): Promise<ICandidateEducation | UpdateResult>;
}
