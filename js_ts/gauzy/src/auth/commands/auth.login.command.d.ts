import { ICommand } from '@nestjs/cqrs';
import { IUserLoginInput } from '../../../plugins/contracts';
export declare class AuthLoginCommand implements ICommand {
    readonly input: IUserLoginInput;
    static readonly type = "[Auth] Login";
    constructor(input: IUserLoginInput);
}
