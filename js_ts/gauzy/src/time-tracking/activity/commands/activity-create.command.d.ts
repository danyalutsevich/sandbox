import { ICommand } from '@nestjs/cqrs';
import { IActivity } from '../../../../plugins/contracts/dist/index';
export declare class ActivityCreateCommand implements ICommand {
    readonly input: IActivity;
    static readonly type = "[Activity] Create Activity";
    constructor(input: IActivity);
}
