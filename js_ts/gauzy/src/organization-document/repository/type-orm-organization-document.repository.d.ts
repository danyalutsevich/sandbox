import { Repository } from 'typeorm';
import { OrganizationDocument } from '../organization-document.entity';
export declare class TypeOrmOrganizationDocumentRepository extends Repository<OrganizationDocument> {
    readonly repository: Repository<OrganizationDocument>;
    constructor(repository: Repository<OrganizationDocument>);
}
