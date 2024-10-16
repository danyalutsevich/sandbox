import { IQuery } from '@nestjs/cqrs';
import { ITaskVersionFindInput } from '../../../../plugins/contracts/dist/index';
export declare class FindVersionsQuery implements IQuery {
    readonly options: ITaskVersionFindInput;
    static readonly type = "[Task Versions] Query All";
    constructor(options: ITaskVersionFindInput);
}
