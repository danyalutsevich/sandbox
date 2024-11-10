import { IBulkActivitiesInput } from '../../../../plugins/contracts/dist/index';
import { ICommand } from '@nestjs/cqrs';
export declare class BulkActivitiesSaveCommand implements ICommand {
    readonly input: IBulkActivitiesInput;
    static readonly type = "[Activity] Bulk Create Activities";
    constructor(input: IBulkActivitiesInput);
}
