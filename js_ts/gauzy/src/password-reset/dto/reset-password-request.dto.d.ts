import { IResetPasswordRequest } from '../../../plugins/contracts';
import { UserEmailDTO } from "./../../user/dto";
/**
 * Reset Password Request DTO validation
 */
export declare class ResetPasswordRequestDTO extends UserEmailDTO implements IResetPasswordRequest {
}
