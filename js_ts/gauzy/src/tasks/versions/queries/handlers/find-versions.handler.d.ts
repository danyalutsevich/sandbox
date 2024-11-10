import { IQueryHandler } from '@nestjs/cqrs';
import { IPagination, ITaskVersion } from '../../../../../plugins/contracts/dist/index';
import { TaskVersionService } from '../../version.service';
import { FindVersionsQuery } from '../find-versions.query';
export declare class FindVersionsHandler implements IQueryHandler<FindVersionsQuery> {
    private readonly taskVersionService;
    constructor(taskVersionService: TaskVersionService);
    /**
     *
     * @param query
     * @returns
     */
    execute(query: FindVersionsQuery): Promise<IPagination<ITaskVersion>>;
}
