import { TenantAwareCrudService } from '../core/crud';
import { TypeOrmOrganizationDocumentRepository } from './repository/type-orm-organization-document.repository';
import { MikroOrmOrganizationDocumentRepository } from './repository/mikro-orm-organization-document.repository';
import { OrganizationDocument } from './organization-document.entity';
export declare class OrganizationDocumentService extends TenantAwareCrudService<OrganizationDocument> {
    constructor(typeOrmOrganizationDocumentRepository: TypeOrmOrganizationDocumentRepository, mikroOrmOrganizationDocumentRepository: MikroOrmOrganizationDocumentRepository);
}
