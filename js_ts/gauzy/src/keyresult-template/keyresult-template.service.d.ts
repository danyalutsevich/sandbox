import { TenantAwareCrudService } from './../core/crud';
import { KeyResultTemplate } from './keyresult-template.entity';
import { MikroOrmKeyResultTemplateRepository } from './repository/mikro-orm-keyresult-template.repository';
import { TypeOrmKeyResultTemplateRepository } from './repository/type-orm-keyresult-template.repository';
export declare class KeyresultTemplateService extends TenantAwareCrudService<KeyResultTemplate> {
    constructor(typeOrmKeyResultTemplateRepository: TypeOrmKeyResultTemplateRepository, mikroOrmKeyResultTemplateRepository: MikroOrmKeyResultTemplateRepository);
}
