import { ITenant, IOrganization, IRolePermission, IFeatureOrganization, IImageAsset } from '../../plugins/contracts/dist/index';
import { BaseEntity, ImageAsset } from '../core/entities/internal';
export declare class Tenant extends BaseEntity implements ITenant {
    name?: string;
    logo?: string;
    /**
     * ImageAsset
     */
    image?: ImageAsset;
    imageId?: IImageAsset['id'];
    organizations?: IOrganization[];
    rolePermissions?: IRolePermission[];
    /**
     * Array of feature organizations associated with the entity.
     */
    featureOrganizations?: IFeatureOrganization[];
}
