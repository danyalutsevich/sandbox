import { IBasePerTenantEntityModel, ITenant, IUserCodeInput, IUserEmailInput, IUserTokenInput } from '../../../plugins/contracts';
import { UserCodeDTO, UserEmailDTO, UserTokenDTO } from './../../user/dto';
declare const ConfirmEmailByTokenDTO_base: import("@nestjs/common").Type<UserEmailDTO & UserTokenDTO>;
/**
 * Email confirmation (By TOKEN) DTO request validation
 */
export declare class ConfirmEmailByTokenDTO extends ConfirmEmailByTokenDTO_base implements IUserEmailInput, IUserTokenInput {
}
declare const ConfirmEmailByCodeDTO_base: import("@nestjs/common").Type<UserEmailDTO & UserCodeDTO>;
/**
 * Email confirmation (By CODE) DTO request validation
 */
export declare class ConfirmEmailByCodeDTO extends ConfirmEmailByCodeDTO_base implements IUserEmailInput, IUserCodeInput, IBasePerTenantEntityModel {
    readonly tenantId: ITenant['id'];
}
export {};
