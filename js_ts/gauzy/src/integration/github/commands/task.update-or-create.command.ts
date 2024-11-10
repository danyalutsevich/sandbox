import { IGetTaskOptions, ITask } from '../../../../plugins/contracts/dist/index';

export class GithubTaskUpdateOrCreateCommand {

    constructor(
        public readonly task: ITask,
        public readonly options: IGetTaskOptions,
    ) { }
}
