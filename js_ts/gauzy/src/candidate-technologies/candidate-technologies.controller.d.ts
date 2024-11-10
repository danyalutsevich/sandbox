import { CommandBus } from '@nestjs/cqrs';
import { ICandidateTechnologies, IPagination } from '../../plugins/contracts/dist/index';
import { CrudController } from './../core/crud';
import { CandidateTechnologiesService } from './candidate-technologies.service';
import { CandidateTechnologies } from './candidate-technologies.entity';
export declare class CandidateTechnologiesController extends CrudController<CandidateTechnologies> {
    private readonly candidateTechnologiesService;
    private readonly commandBus;
    constructor(candidateTechnologiesService: CandidateTechnologiesService, commandBus: CommandBus);
    /**
     * CREATE bulk candidate technologies
     *
     * @param body
     * @returns
     */
    createBulkCandidateTechnoglies(body: any): Promise<ICandidateTechnologies[]>;
    /**
     * UPDATE bulk candidate technologies
     *
     * @param body
     * @returns
     */
    updateBulkCandidateTechnoglies(body: ICandidateTechnologies[]): Promise<ICandidateTechnologies[]>;
    /**
     * GET candidate technology by feedback id
     *
     * @param interviewId
     * @returns
     */
    findByInterviewId(interviewId: string): Promise<ICandidateTechnologies[]>;
    /**
     * DELETE bulk candidate technology by id
     *
     * @param id
     * @param data
     * @returns
     */
    deleteBulkTechnologies(id: string, data: any): Promise<any>;
    /**
     * GET all candidate technologies
     *
     * @param data
     * @returns
     */
    findAll(data: any): Promise<IPagination<ICandidateTechnologies>>;
    /**
     * CREATE candidate technologies
     *
     * @param body
     * @returns
     */
    create(body: CandidateTechnologies): Promise<ICandidateTechnologies>;
    /**
     * DELETE candidate technologies by id
     *
     * @param id
     * @returns
     */
    delete(id: string): Promise<any>;
}
