import { IS3FileStorageProviderConfig } from '../../../../plugins/contracts/dist/index';
/**
 * Aws S3 FileStorage Provider Configuration DTO validation
 */
export declare class AwsS3ProviderConfigDTO implements IS3FileStorageProviderConfig {
    readonly aws_access_key_id: string;
    readonly aws_secret_access_key: string;
    readonly aws_default_region: string;
    readonly aws_bucket: string;
    readonly aws_force_path_style: boolean;
}
