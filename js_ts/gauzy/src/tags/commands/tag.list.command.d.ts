import { ICommand } from '@nestjs/cqrs';
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm';
import { Tag } from './../tag.entity';
export declare class TagListCommand implements ICommand {
    readonly input: FindOptionsWhere<Tag>;
    readonly relations: string[] | FindOptionsRelations<Tag>;
    static readonly type = "[Tag] List";
    constructor(input: FindOptionsWhere<Tag>, relations: string[] | FindOptionsRelations<Tag>);
}
