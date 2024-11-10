import { IIssueType, IPagination } from '../../../plugins/contracts';
import { IssueType } from './issue-type.entity';
import { IssueTypeService } from './issue-type.service';
import { IssueTypeQueryDTO, UpdateIssueTypeDTO } from './dto';
declare const IssueTypeController_base: import("../../../plugins/common/dist").Type<import("./../../core/crud").ICrudController<IssueType>>;
export declare class IssueTypeController extends IssueTypeController_base {
    protected readonly issueTypeService: IssueTypeService;
    constructor(issueTypeService: IssueTypeService);
    /**
     *
     * @param id
     * @param input
     * @returns
     */
    markAsDefault(id: IIssueType['id'], input: UpdateIssueTypeDTO): Promise<IIssueType[]>;
    /**
     * GET issue types by filters
     * If parameters not match, retrieve global task sizes
     *
     * @param params
     * @returns
     */
    findAllIssueTypes(params: IssueTypeQueryDTO): Promise<IPagination<IIssueType>>;
}
export {};
