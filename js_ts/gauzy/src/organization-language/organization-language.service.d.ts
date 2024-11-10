import { TenantAwareCrudService } from './../core/crud';
import { OrganizationLanguage } from './organization-language.entity';
import { TypeOrmOrganizationLanguageRepository } from './repository/type-orm-organization-language.repository';
import { MikroOrmOrganizationLanguageRepository } from './repository/mikro-orm-organization-language.repository';
export declare class OrganizationLanguageService extends TenantAwareCrudService<OrganizationLanguage> {
    constructor(typeOrmOrganizationLanguageRepository: TypeOrmOrganizationLanguageRepository, mikroOrmOrganizationLanguageRepository: MikroOrmOrganizationLanguageRepository);
}
