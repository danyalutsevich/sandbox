import { FindOptionsRelations, SelectQueryBuilder } from 'typeorm';
import { IPagination, ITag, ITagFindInput } from '../../plugins/contracts/dist/index';
import { TenantAwareCrudService } from '../core/crud';
import { Tag } from './tag.entity';
import { MikroOrmTagRepository } from './repository/mikro-orm-tag.repository';
import { TypeOrmTagRepository } from './repository/type-orm-tag.repository';
export declare class TagService extends TenantAwareCrudService<Tag> {
    constructor(typeOrmTagRepository: TypeOrmTagRepository, mikroOrmTagRepository: MikroOrmTagRepository);
    /**
     * GET tags by tenant or organization level
     *
     * @param input
     * @param relations
     * @returns
     */
    findTagsByLevel(input: ITagFindInput, relations?: string[]): Promise<IPagination<ITag>>;
    /**
     * GET tenant/organization level tags
     *
     * @param input
     * @param relations
     * @returns
     */
    findTags(input: ITagFindInput, relations?: string[] | FindOptionsRelations<Tag>): Promise<IPagination<ITag>>;
    /**
     * Get filter query for tags
     *
     * @param query
     * @param request
     * @returns
     */
    getFilterTagQuery(query: SelectQueryBuilder<Tag>, request: ITagFindInput): SelectQueryBuilder<Tag>;
}
