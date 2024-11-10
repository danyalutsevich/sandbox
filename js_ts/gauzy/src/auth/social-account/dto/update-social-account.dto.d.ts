import { ISocialAccountUpdateInput } from '../../../../plugins/contracts';
import { TenantBaseDTO } from '../../../core/dto';
import { CreateSocialAccountDTO } from './create-social-account.dto';
declare const UpdateSocialAccountDTO_base: import("@nestjs/common").Type<TenantBaseDTO & Partial<Pick<CreateSocialAccountDTO, keyof CreateSocialAccountDTO>>>;
/**
 * Update Social Account DTO Validation
 */
export declare class UpdateSocialAccountDTO extends UpdateSocialAccountDTO_base implements ISocialAccountUpdateInput {
}
export {};
