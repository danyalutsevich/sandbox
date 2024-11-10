import { ICommand } from '@nestjs/cqrs';
import { ITask } from '../../../../plugins/contracts/dist/index';
export declare class TaskEstimationCalculateCommand implements ICommand {
    readonly id: ITask['id'];
    static readonly type = "[Task Estimation] Calculate Task Estimation";
    constructor(id: ITask['id']);
}
