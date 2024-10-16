import { ICloudinaryFileStorageProviderConfig } from '../../../../plugins/contracts/dist/index';
/**
 * Cloudinary FileStorage Provider Configuration DTO validation
 */
export declare class CloudinaryProviderConfigDTO implements ICloudinaryFileStorageProviderConfig {
    readonly cloudinary_cloud_name: string;
    readonly cloudinary_api_key: string;
    readonly cloudinary_api_secret: string;
    readonly cloudinary_api_secure: string;
}
