import { ITimeOffPolicyCreateInput, ITimeOffPolicyUpdateInput, ITimeOffPolicy, IPagination } from '../../plugins/contracts/dist/index';
import { CrudController, PaginationParams } from './../core/crud';
import { TimeOffPolicy } from './time-off-policy.entity';
import { TimeOffPolicyService } from './time-off-policy.service';
export declare class TimeOffPolicyController extends CrudController<TimeOffPolicy> {
    private readonly timeOffPolicyService;
    constructor(timeOffPolicyService: TimeOffPolicyService);
    /**
     * GET all time off policies using pagination
     *
     */
    pagination(filter: PaginationParams<TimeOffPolicy>): Promise<IPagination<ITimeOffPolicy>>;
    /**
     * GET all time off policies
     *
     * @param data
     * @returns
     */
    findAll(data: any): Promise<IPagination<ITimeOffPolicy>>;
    /**
     * CREATE time off policy
     *
     * @param entity
     * @returns
     */
    create(entity: ITimeOffPolicyCreateInput): Promise<ITimeOffPolicy>;
    /**
     * UPDATE time off policy by id
     *
     * @param id
     * @param entity
     * @returns
     */
    update(id: ITimeOffPolicy['id'], entity: ITimeOffPolicyUpdateInput): Promise<ITimeOffPolicy>;
}
