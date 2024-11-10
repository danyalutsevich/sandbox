import { CommandBus } from '@nestjs/cqrs';
import { IPagination, ITimeOff as ITimeOffRequest, ITimeOffCreateInput, ITimeOffUpdateInput } from '../../plugins/contracts/dist/index';
import { CrudController, PaginationParams } from './../core/crud';
import { TimeOffRequest } from './time-off-request.entity';
import { TimeOffRequestService } from './time-off-request.service';
export declare class TimeOffRequestController extends CrudController<TimeOffRequest> {
    private readonly timeOffRequestService;
    private readonly commandBus;
    constructor(timeOffRequestService: TimeOffRequestService, commandBus: CommandBus);
    pagination(options: PaginationParams<TimeOffRequest>): Promise<IPagination<ITimeOffRequest>>;
    /**
     * UPDATE time off request approved
     *
     * @param id
     * @returns
     */
    timeOffRequestApproved(id: string): Promise<ITimeOffRequest>;
    /**
     * UPDATE time off request denied
     *
     * @param id
     * @returns
     */
    timeOffRequestDenied(id: string): Promise<ITimeOffRequest>;
    /**
     * GET all time off requests
     *
     * @param data
     * @returns
     */
    findAll(data: any): Promise<IPagination<ITimeOffRequest>>;
    /**
     * CREATE new time off request/holiday
     *
     * @param entity
     * @param options
     * @returns
     */
    create(entity: ITimeOffCreateInput): Promise<ITimeOffRequest>;
    /**
     * UPDATE time off request by id
     *
     * @param id
     * @param entity
     * @returns
     */
    update(id: string, entity: ITimeOffUpdateInput): Promise<ITimeOffRequest>;
}
