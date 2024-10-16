import { IWasabiFileStorageProviderConfig } from '../../../../plugins/contracts/dist/index';
/**
 * Wasabi S3 FileStorage Provider Configuration DTO validation
 */
export declare class WasabiS3ProviderConfigDTO implements IWasabiFileStorageProviderConfig {
    readonly wasabi_aws_access_key_id: string;
    readonly wasabi_aws_secret_access_key: string;
    readonly wasabi_aws_bucket: string;
    readonly wasabi_aws_default_region: string;
    readonly wasabi_aws_service_url: string;
    readonly wasabi_aws_force_path_style: boolean;
}
