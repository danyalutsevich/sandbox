import { IChangePasswordRequest } from '../../../plugins/contracts';
/**
 * Change Password Request DTO validation
 */
export declare class ChangePasswordRequestDTO implements IChangePasswordRequest {
    readonly token: string;
    readonly password: string;
    readonly confirmPassword: string;
}
