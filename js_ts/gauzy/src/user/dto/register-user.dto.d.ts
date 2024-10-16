import { IUserRegistrationInput } from '../../../plugins/contracts';
import { CreateUserDTO } from "./create-user.dto";
/**
 * Register User DTO validation
 */
export declare class RegisterUserDTO implements IUserRegistrationInput {
    readonly password: string;
    readonly confirmPassword: string;
    readonly user: CreateUserDTO;
}
