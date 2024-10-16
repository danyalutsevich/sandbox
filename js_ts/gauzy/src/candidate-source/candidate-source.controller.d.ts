import { CandidateSource } from './candidate-source.entity';
import { UpdateResult } from 'typeorm';
import { ICandidateSource, IPagination } from '../../plugins/contracts/dist/index';
import { CrudController, PaginationParams } from './../core/crud';
import { CandidateSourceService } from './candidate-source.service';
import { CreateCandidateSourceDTO, UpdateCandidateSourceDTO } from './dto';
export declare class CandidateSourceController extends CrudController<CandidateSource> {
    private readonly candidateSourceService;
    constructor(candidateSourceService: CandidateSourceService);
    /**
     * GET candidate sources by pagination
     *
     * @param params
     * @returns
     */
    pagination(params: PaginationParams<CandidateSource>): Promise<IPagination<ICandidateSource>>;
    /**
     * GET candidate sources
     *
     * @param params
     * @returns
     */
    findAll(params: PaginationParams<CandidateSource>): Promise<IPagination<ICandidateSource>>;
    /**
     * CREATE candidate source
     *
     * @param entity
     * @returns
     */
    create(entity: CreateCandidateSourceDTO): Promise<ICandidateSource>;
    /**
     * UPDATE candidate source
     *
     * @param entity
     * @returns
     */
    update(id: ICandidateSource['id'], entity: UpdateCandidateSourceDTO): Promise<ICandidateSource | UpdateResult>;
}
