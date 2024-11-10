import { ICandidateDocument, IPagination } from '../../plugins/contracts/dist/index';
import { CrudController, PaginationParams } from './../core/crud';
import { CandidateDocumentsService } from './candidate-documents.service';
import { CandidateDocument } from './candidate-documents.entity';
export declare class CandidateDocumentsController extends CrudController<CandidateDocument> {
    private readonly candidateDocumentsService;
    constructor(candidateDocumentsService: CandidateDocumentsService);
    /**
     * GET all candidate documents
     *
     * @param params
     * @returns
     */
    findAll(params: PaginationParams<CandidateDocument>): Promise<IPagination<ICandidateDocument>>;
}
