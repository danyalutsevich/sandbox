import { IImageAssetUploadInput } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from "./../../core/dto";
declare const UploadImageAsset_base: import("@nestjs/common").Type<Partial<Pick<TenantOrganizationBaseDTO, keyof TenantOrganizationBaseDTO>>>;
/**
 * Upload image asset request DTO validation
 */
export declare class UploadImageAsset extends UploadImageAsset_base implements IImageAssetUploadInput {
}
export {};
