import { ICommand } from '@nestjs/cqrs';
import { ITagCreateInput } from '../../../plugins/contracts';
export declare class TagCreateCommand implements ICommand {
    readonly input: ITagCreateInput;
    static readonly type = "[Tag] Create Task";
    constructor(input: ITagCreateInput);
}
