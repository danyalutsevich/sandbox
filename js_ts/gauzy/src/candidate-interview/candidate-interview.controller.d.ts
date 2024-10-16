import { FindOptionsWhere, UpdateResult } from 'typeorm';
import { ICandidate, ICandidateInterview, ICandidateInterviewCreateInput, IPagination } from '../../plugins/contracts/dist/index';
import { CrudController, PaginationParams } from './../core/crud';
import { CandidateInterview } from './candidate-interview.entity';
import { CandidateInterviewService } from './candidate-interview.service';
export declare class CandidateInterviewController extends CrudController<CandidateInterview> {
    private readonly candidateInterviewService;
    constructor(candidateInterviewService: CandidateInterviewService);
    /**
     * GET candidate interviews by candidate id
     *
     * @param id
     * @returns
     */
    findByCandidateId(id: ICandidate['id']): Promise<ICandidateInterview[]>;
    /**
     * GET candidate interview count
     *
     * @param options
     * @returns
     */
    getCount(options: FindOptionsWhere<CandidateInterview>): Promise<number>;
    /**
     * GET candidate interviews by pagination
     *
     * @param params
     * @returns
     */
    pagination(params: PaginationParams<CandidateInterview>): Promise<IPagination<ICandidateInterview>>;
    /**
     * GET candidate interviews
     *
     * @param params
     * @returns
     */
    findAll(params: PaginationParams<CandidateInterview>): Promise<IPagination<ICandidateInterview>>;
    /**
     * GET candidate interview by id
     *
     * @param id
     * @returns
     */
    findById(id: ICandidateInterview['id']): Promise<ICandidateInterview>;
    /**
     * CREATE candidate interview
     *
     * @param entity
     * @returns
     */
    create(entity: ICandidateInterviewCreateInput): Promise<ICandidateInterview>;
    /**
     * UPDATE candidate interview by id
     *
     * @param id
     * @param entity
     * @returns
     */
    update(id: ICandidateInterview['id'], entity: ICandidateInterviewCreateInput): Promise<ICandidateInterview | UpdateResult>;
}
