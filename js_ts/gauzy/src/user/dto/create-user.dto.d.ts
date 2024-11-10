import { IUserCreateInput, LanguagesEnum } from '../../../plugins/contracts';
import { RoleFeatureDTO } from "./../../role/dto";
import { UserEmailDTO } from "./user-email.dto";
declare const CreateUserDTO_base: import("@nestjs/common").Type<UserEmailDTO & Partial<RoleFeatureDTO>>;
/**
 * DTO (Data Transfer Object) for creating a user.
 * Extends UserEmailDTO and includes partial RoleFeatureDTO.
 */
export declare class CreateUserDTO extends CreateUserDTO_base implements IUserCreateInput {
    /**
     * Optional: User's first name.
     */
    readonly firstName?: string;
    /**
     * User's last name.
     */
    readonly lastName?: string;
    /**
     * Optional: User's image URL.
     */
    readonly imageUrl?: string;
    /**
     * Optional: Preferred language for the user.
     */
    readonly preferredLanguage?: LanguagesEnum;
}
export {};
