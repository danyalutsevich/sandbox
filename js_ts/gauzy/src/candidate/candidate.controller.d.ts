import { CommandBus } from '@nestjs/cqrs';
import { LanguagesEnum, ICandidate, IPagination } from '../../plugins/contracts/dist/index';
import { FindOptionsWhere } from 'typeorm';
import { CrudController, OptionParams, PaginationParams } from './../core/crud';
import { CandidateService } from './candidate.service';
import { Candidate } from './candidate.entity';
import { CreateCandidateDTO, UpdateCandidateDTO, CandidateBulkInputDTO } from './dto';
export declare class CandidateController extends CrudController<Candidate> {
    private readonly candidateService;
    private readonly commandBus;
    constructor(candidateService: CandidateService, commandBus: CommandBus);
    /**
     * CREATE bulk candidate
     *
     * @param body
     * @param languageCode
     * @returns
     */
    createBulk(entity: CandidateBulkInputDTO, themeLanguage: LanguagesEnum, languageCode: LanguagesEnum, originUrl: string): Promise<ICandidate[]>;
    /**
     * GET candidate counts
     *
     * @param options
     * @returns
     */
    getCount(options: FindOptionsWhere<Candidate>): Promise<number>;
    /**
     * GET candidates by pagination
     *
     * @param options
     * @returns
     */
    pagination(options: PaginationParams<Candidate>): Promise<IPagination<ICandidate>>;
    /**
     * GET all candidates
     *
     * @param data
     * @returns
     */
    findAll(options: PaginationParams<Candidate>): Promise<IPagination<ICandidate>>;
    /**
     * GET candidate by id
     * @param id
     * @param data
     * @returns
     */
    findById(id: ICandidate['id'], params: OptionParams<Candidate>): Promise<ICandidate>;
    /**
     * CREATE new candidate
     *
     * @param body
     * @returns
     */
    create(entity: CreateCandidateDTO, languageCode: LanguagesEnum, originUrl: string): Promise<ICandidate>;
    /**
     * UPDATE Candidate By Id
     *
     * @param id
     * @param entity
     * @returns
     */
    update(id: ICandidate['id'], entity: UpdateCandidateDTO): Promise<ICandidate>;
    /**
     * Hired candidate user and migrate to employee user
     * UPDATE Candidate By Id
     *
     * @param id
     * @returns
     */
    updateHiredStatus(id: ICandidate['id']): Promise<ICandidate>;
    /**
     * Rejected candidate user
     * UPDATE Candidate By Id
     *
     * @param id
     * @returns
     */
    updateRejectedStatus(id: ICandidate['id']): Promise<ICandidate>;
}
