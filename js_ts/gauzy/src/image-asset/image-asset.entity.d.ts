import { FileStorageProvider, IEquipment, IImageAsset, IWarehouse } from '../../plugins/contracts/dist/index';
import { Product, TenantOrganizationBaseEntity } from './../core/entities/internal';
export declare class ImageAsset extends TenantOrganizationBaseEntity implements IImageAsset {
    name: string;
    url: string;
    thumb?: string;
    width?: number;
    height?: number;
    size?: number;
    isFeatured?: boolean;
    externalProviderId?: string;
    storageProvider?: FileStorageProvider;
    /** Additional virtual columns */
    fullUrl?: string;
    thumbUrl?: string;
    /**
     * Product
     */
    productFeaturedImage?: Product[];
    /**
     * Equipment
     */
    equipmentImage?: IEquipment[];
    /**
     * Warehouse
     */
    warehouses?: IWarehouse[];
    /**
     * Product
     */
    productGallery?: Product[];
}
