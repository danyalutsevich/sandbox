import { ICommand } from '@nestjs/cqrs';
import { ITaskEstimation, ITaskEstimationUpdateInput } from '../../../../plugins/contracts/dist/index';
export declare class TaskEstimationUpdateCommand implements ICommand {
    readonly id: ITaskEstimation['id'];
    readonly input: ITaskEstimationUpdateInput;
    static readonly type = "[Task Estimation] Update Task Estimation";
    constructor(id: ITaskEstimation['id'], input: ITaskEstimationUpdateInput);
}
