import { CandidateInterviewers } from './candidate-interviewers.entity';
import { CommandBus } from '@nestjs/cqrs';
import { ICandidateInterviewersCreateInput, ICandidateInterviewers, IPagination } from '../../plugins/contracts/dist/index';
import { CrudController } from './../core/crud';
import { CandidateInterviewersService } from './candidate-interviewers.service';
export declare class CandidateInterviewersController extends CrudController<CandidateInterviewers> {
    private readonly candidateInterviewersService;
    private readonly commandBus;
    constructor(candidateInterviewersService: CandidateInterviewersService, commandBus: CommandBus);
    /**
     * CREATE bulk candidate interviewers
     *
     * @param body
     * @returns
     */
    createBulk(body: ICandidateInterviewersCreateInput): Promise<ICandidateInterviewers[]>;
    /**
     * GET candidate interviewers by interview id
     *
     * @param interviewId
     * @returns
     */
    findByInterviewId(interviewId: string): Promise<ICandidateInterviewers[]>;
    /**
     * DELETE bulk interviewer by interview id
     *
     * @param id
     * @returns
     */
    deleteBulkByInterviewId(id: string): Promise<any>;
    /**
     * DELETE candidate interviewers by bulk employee ids
     *
     * @param data
     * @returns
     */
    deleteBulkByEmployeeId(data: any): Promise<any>;
    /**
     * GET all candidate interviewers
     *
     * @param data
     * @returns
     */
    findAll(data: any): Promise<IPagination<ICandidateInterviewers>>;
    /**
     * CREATE candidate interviewer
     *
     * @param body
     * @returns
     */
    create(body: ICandidateInterviewersCreateInput): Promise<ICandidateInterviewers>;
}
