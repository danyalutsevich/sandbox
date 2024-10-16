import { ICommandHandler } from '@nestjs/cqrs';
import { IPagination, ITag } from '../../../../plugins/contracts/dist/index';
import { TagService } from './../../tag.service';
import { TagListCommand } from './../tag.list.command';
export declare class TagListHandler implements ICommandHandler<TagListCommand> {
    private readonly tagService;
    constructor(tagService: TagService);
    execute(command: TagListCommand): Promise<IPagination<ITag>>;
}
