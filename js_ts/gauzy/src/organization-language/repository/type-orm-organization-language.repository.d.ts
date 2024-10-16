import { Repository } from 'typeorm';
import { OrganizationLanguage } from '../organization-language.entity';
export declare class TypeOrmOrganizationLanguageRepository extends Repository<OrganizationLanguage> {
    readonly repository: Repository<OrganizationLanguage>;
    constructor(repository: Repository<OrganizationLanguage>);
}
