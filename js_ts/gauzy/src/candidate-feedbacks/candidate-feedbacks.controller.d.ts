import { CommandBus } from '@nestjs/cqrs';
import { FindOptionsWhere } from 'typeorm';
import { ICandidateFeedbackCreateInput, IPagination, ICandidateFeedback } from '../../plugins/contracts/dist/index';
import { CrudController, PaginationParams } from './../core/crud';
import { CandidateFeedback } from './candidate-feedbacks.entity';
import { CandidateFeedbacksService } from './candidate-feedbacks.service';
export declare class CandidateFeedbacksController extends CrudController<CandidateFeedback> {
    private readonly candidateFeedbacksService;
    private readonly commandBus;
    constructor(candidateFeedbacksService: CandidateFeedbacksService, commandBus: CommandBus);
    /**
     * GET feedback by interview id
     *
     * @param interviewId
     * @returns
     */
    findByInterviewId(interviewId: string): Promise<CandidateFeedback[]>;
    /**
     * DELETE feedback by interview id
     *
     * @param interviewId
     * @param feedbackId
     * @returns
     */
    deleteFeedback(interviewId: string, feedbackId: string): Promise<any>;
    /**
     * GET candidate feedback count
     *
     * @param filter
     * @returns
     */
    getCount(options: FindOptionsWhere<CandidateFeedback>): Promise<number>;
    /**
     * GET candidate feedbacks by pagination
     *
     * @param filter
     * @returns
     */
    pagination(filter: PaginationParams<CandidateFeedback>): Promise<IPagination<ICandidateFeedback>>;
    /**
     * GET all candidate feedbacks
     *
     * @param data
     * @returns
     */
    findAll(data: any): Promise<IPagination<ICandidateFeedback>>;
    /**
     * GET candidate feedback by id
     *
     * @param id
     * @returns
     */
    findById(id: string): Promise<ICandidateFeedback>;
    /**
     * CREATE candidate feedback
     *
     * @param body
     * @returns
     */
    create(body: ICandidateFeedbackCreateInput): Promise<ICandidateFeedback>;
    /**
     * UPDATE candidate feedback by id
     *
     * @param id
     * @param body
     * @returns
     */
    update(id: string, body: ICandidateFeedbackCreateInput): Promise<ICandidateFeedback>;
}
