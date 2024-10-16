import { IImageAsset as IDocumentAsset, IOrganizationDocument } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class OrganizationDocument extends TenantOrganizationBaseEntity implements IOrganizationDocument {
    name: string;
    documentUrl: string;
    /**
     * Document Asset
     */
    document?: IDocumentAsset;
    documentId?: IDocumentAsset['id'];
}
