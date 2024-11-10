import { UpdateResult } from 'typeorm';
import { ICandidateSkill, IPagination } from '../../plugins/contracts/dist/index';
import { CrudController, PaginationParams } from './../core/crud';
import { CandidateSkill } from './candidate-skill.entity';
import { CandidateSkillService } from './candidate-skill.service';
import { CreateCandidateSkillDTO, UpdateCandidateSkillDTO } from './dto';
export declare class CandidateSkillController extends CrudController<CandidateSkill> {
    private readonly candidateSkillService;
    constructor(candidateSkillService: CandidateSkillService);
    /**
     * GET candidate skills by pagination
     *
     * @param params
     * @returns
     */
    pagination(params: PaginationParams<CandidateSkill>): Promise<IPagination<ICandidateSkill>>;
    /**
     * GET candidate skills
     *
     * @param params
     * @returns
     */
    findAll(params: PaginationParams<CandidateSkill>): Promise<IPagination<ICandidateSkill>>;
    /**
     * CREATE candidate skill
     *
     * @param entity
     * @returns
     */
    create(entity: CreateCandidateSkillDTO): Promise<ICandidateSkill>;
    /**
     * UPDATE candidate skill
     *
     * @param entity
     * @returns
     */
    update(id: ICandidateSkill['id'], entity: UpdateCandidateSkillDTO): Promise<ICandidateSkill | UpdateResult>;
}
