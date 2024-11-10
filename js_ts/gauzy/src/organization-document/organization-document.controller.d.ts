import { IOrganizationDocument, IPagination } from '../../plugins/contracts/dist/index';
import { CrudController } from './../core/crud';
import { OrganizationDocument } from './organization-document.entity';
import { OrganizationDocumentService } from './organization-document.service';
export declare class OrganizationDocumentController extends CrudController<OrganizationDocument> {
    private readonly organizationDocumentService;
    constructor(organizationDocumentService: OrganizationDocumentService);
    /**
     * GET all organization documents
     *
     * @param data
     * @returns
     */
    findAll(data: any): Promise<IPagination<IOrganizationDocument>>;
}
