import { CommandBus } from '@nestjs/cqrs';
import { UpdateResult } from 'typeorm';
import { IPagination, ITag } from '../../plugins/contracts/dist/index';
import { CrudController, PaginationParams } from './../core/crud';
import { Tag } from './tag.entity';
import { TagService } from './tag.service';
import { CreateTagDTO, TagQueryByLevelDTO, UpdateTagDTO } from './dto';
export declare class TagController extends CrudController<Tag> {
    private readonly tagService;
    private readonly commandBus;
    constructor(tagService: TagService, commandBus: CommandBus);
    /**
     * Get tags by level
     *
     * @param query
     */
    findTagsByLevel(query: TagQueryByLevelDTO): Promise<IPagination<ITag>>;
    /**
     * Get tags
     *
     * @param data
     * @returns
     */
    findAll(options: PaginationParams<Tag>): Promise<any>;
    /**
     * Create new tag
     *
     * @param entity
     * @returns
     */
    create(entity: CreateTagDTO): Promise<ITag>;
    /**
     * Update existing tag by ID
     *
     * @param id
     * @param entity
     * @returns
     */
    update(id: ITag['id'], entity: UpdateTagDTO): Promise<ITag | UpdateResult>;
}
