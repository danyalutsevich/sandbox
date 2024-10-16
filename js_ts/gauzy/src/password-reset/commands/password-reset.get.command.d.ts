import { IPasswordResetFindInput } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class PasswordResetGetCommand implements ICommand {
    readonly input: IPasswordResetFindInput;
    static readonly type = "[Password Reset] Get";
    constructor(input: IPasswordResetFindInput);
}
