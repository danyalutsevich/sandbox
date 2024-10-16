import { IQuery } from '@nestjs/cqrs';
import { ITaskStatusFindInput } from '../../../../plugins/contracts/dist/index';
export declare class FindStatusesQuery implements IQuery {
    readonly options: ITaskStatusFindInput;
    static readonly type = "[Task Statuses] Query All";
    constructor(options: ITaskStatusFindInput);
}
