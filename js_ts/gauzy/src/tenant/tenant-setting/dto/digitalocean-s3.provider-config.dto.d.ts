import { IDigitalOceanFileStorageProviderConfig } from '../../../../plugins/contracts/dist/index';
/**
 * DigitalOcean S3 FileStorage Provider Configuration DTO validation
 */
export declare class DigitalOceanS3ProviderConfigDTO implements IDigitalOceanFileStorageProviderConfig {
    readonly digitalocean_access_key_id: string;
    readonly digitalocean_secret_access_key: string;
    readonly digitalocean_s3_bucket: string;
    readonly digitalocean_service_url: string;
    readonly digitalocean_cdn_url: string;
    readonly digitalocean_default_region: string;
    readonly digitalocean_s3_force_path_style: boolean;
}
