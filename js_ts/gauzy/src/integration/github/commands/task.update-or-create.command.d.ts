import { IGetTaskOptions, ITask } from '../../../../plugins/contracts/dist/index';
export declare class GithubTaskUpdateOrCreateCommand {
    readonly task: ITask;
    readonly options: IGetTaskOptions;
    constructor(task: ITask, options: IGetTaskOptions);
}
