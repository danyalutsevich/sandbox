import { IPasswordReset } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class PasswordResetCreateCommand implements ICommand {
    readonly input: IPasswordReset;
    static readonly type = "[Password Reset] Create";
    constructor(input: IPasswordReset);
}
