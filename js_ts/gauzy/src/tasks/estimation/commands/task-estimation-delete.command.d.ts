import { ICommand } from '@nestjs/cqrs';
export declare class TaskEstimationDeleteCommand implements ICommand {
    readonly id: string;
    static readonly type = "[Task Estimation] Delete Task Estimation";
    constructor(id: string);
}
