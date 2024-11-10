import { FileStorageProviderEnum } from '../../../../plugins/contracts/dist/index';
import { AwsS3ProviderConfigDTO } from "./aws-s3-provider-config.dto";
import { WasabiS3ProviderConfigDTO } from "./wasabi-s3-provider-config.dto";
import { CloudinaryProviderConfigDTO } from "./cloudinary-provider-config.dto";
import { DigitalOceanS3ProviderConfigDTO } from './digitalocean-s3.provider-config.dto';
declare const CreateTenantSettingDTO_base: import("@nestjs/common").Type<WasabiS3ProviderConfigDTO & DigitalOceanS3ProviderConfigDTO & AwsS3ProviderConfigDTO & CloudinaryProviderConfigDTO>;
/**
 * Tenant Setting Save Request DTO validation
 */
export declare class CreateTenantSettingDTO extends CreateTenantSettingDTO_base {
    /**
     * FileStorage Provider Configuration
     */
    readonly fileStorageProvider: FileStorageProviderEnum;
}
export {};
