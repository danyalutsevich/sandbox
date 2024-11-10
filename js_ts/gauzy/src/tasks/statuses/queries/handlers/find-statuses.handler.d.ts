import { IQueryHandler } from '@nestjs/cqrs';
import { IPagination, ITaskStatus } from '../../../../../plugins/contracts/dist/index';
import { TaskStatusService } from '../../status.service';
import { FindStatusesQuery } from '../find-statuses.query';
export declare class FindStatusesHandler implements IQueryHandler<FindStatusesQuery> {
    private readonly taskStatusService;
    constructor(taskStatusService: TaskStatusService);
    /**
     * Executes a query to find task statuses with pagination options.
     * @param query - The FindStatusesQuery containing search criteria and pagination options.
     * @returns A promise of paginated results with task statuses.
     */
    execute(query: FindStatusesQuery): Promise<IPagination<ITaskStatus>>;
}
