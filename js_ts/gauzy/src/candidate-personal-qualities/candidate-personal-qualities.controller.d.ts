import { CommandBus } from '@nestjs/cqrs';
import { ICandidatePersonalQualities, IPagination, ICandidatePersonalQualitiesCreateInput } from '../../plugins/contracts/dist/index';
import { CrudController } from './../core/crud';
import { CandidatePersonalQualities } from './candidate-personal-qualities.entity';
import { CandidatePersonalQualitiesService } from './candidate-personal-qualities.service';
export declare class CandidatePersonalQualitiesController extends CrudController<CandidatePersonalQualities> {
    private readonly candidatePersonalQualitiesService;
    private readonly commandBus;
    constructor(candidatePersonalQualitiesService: CandidatePersonalQualitiesService, commandBus: CommandBus);
    /**
     * GET candidate personal qualities by interview id
     *
     * @param interviewId
     * @returns
     */
    findByInterviewId(interviewId: string): Promise<ICandidatePersonalQualities[]>;
    /**
     * DELETE bulk candidate personal qualities by id
     *
     * @param id
     * @param data
     * @returns
     */
    deleteBulk(id: string, data: any): Promise<any>;
    /**
     * CREATE bulk candidate personal qualities
     *
     * @param body
     * @returns
     */
    createBulk(body: any): Promise<ICandidatePersonalQualities[]>;
    /**
     * GET all candidate personal qualities
     *
     * @param data
     * @returns
     */
    findAll(data: any): Promise<IPagination<ICandidatePersonalQualities>>;
    /**
     * CREATE candidate personal quality
     *
     * @param data
     * @returns
     */
    create(data: ICandidatePersonalQualitiesCreateInput): Promise<ICandidatePersonalQualities>;
    /**
     * DELETE candidate personal qualities by id
     *
     * @param id
     * @returns
     */
    delete(id: string): Promise<any>;
}
