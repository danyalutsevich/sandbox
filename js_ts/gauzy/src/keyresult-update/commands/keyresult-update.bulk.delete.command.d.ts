import { ICommand } from '@nestjs/cqrs';
export declare class KeyResultUpdateBulkDeleteCommand implements ICommand {
    readonly id: string;
    static readonly type = "[KeyResultUpdate] Delete";
    constructor(id: string);
}
