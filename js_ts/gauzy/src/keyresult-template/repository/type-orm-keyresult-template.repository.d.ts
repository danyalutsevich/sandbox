import { Repository } from 'typeorm';
import { KeyResultTemplate } from '../keyresult-template.entity';
export declare class TypeOrmKeyResultTemplateRepository extends Repository<KeyResultTemplate> {
    readonly repository: Repository<KeyResultTemplate>;
    constructor(repository: Repository<KeyResultTemplate>);
}
