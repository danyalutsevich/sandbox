import { IUserUpdateInput } from '../../../plugins/contracts';
import { CreateUserDTO } from "./create-user.dto";
declare const UpdateUserDTO_base: import("@nestjs/common").Type<Partial<CreateUserDTO>>;
/**
 * Update User DTO validation
 */
export declare class UpdateUserDTO extends UpdateUserDTO_base implements IUserUpdateInput {
    readonly isActive?: boolean;
}
export {};
