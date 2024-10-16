import { IRole, IUser } from '../../../plugins/contracts';
import { CreateUserDTO } from "./../../user/dto";
export declare class UserInputDTO extends CreateUserDTO implements IUser {
    role: IRole;
}
