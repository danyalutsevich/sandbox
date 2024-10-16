import { ICommand } from '@nestjs/cqrs';
import { IGetTimeLogConflictInput } from '../../../../plugins/contracts/dist/index';
export declare class IGetConflictTimeLogCommand implements ICommand {
    readonly input: IGetTimeLogConflictInput;
    static readonly type = "[TimeLog] get conflict";
    constructor(input: IGetTimeLogConflictInput);
}
