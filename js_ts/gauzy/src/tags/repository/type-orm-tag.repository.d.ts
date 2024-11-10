import { Repository } from 'typeorm';
import { Tag } from '../tag.entity';
export declare class TypeOrmTagRepository extends Repository<Tag> {
    readonly repository: Repository<Tag>;
    constructor(repository: Repository<Tag>);
}
