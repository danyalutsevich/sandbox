import { ICommand } from '@nestjs/cqrs';
import { ITag, ITagUpdateInput } from '../../../plugins/contracts';
export declare class TagUpdateCommand implements ICommand {
    readonly id: ITag['id'];
    readonly input: ITagUpdateInput;
    static readonly type = "[Tag] Update Tag";
    constructor(id: ITag['id'], input: ITagUpdateInput);
}
