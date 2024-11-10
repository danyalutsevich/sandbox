import { ICommandHandler } from '@nestjs/cqrs';
import { PasswordResetGetCommand } from './../password-reset.get.command';
import { PasswordResetService } from './../../password-reset.service';
import { IPasswordReset } from '../../../../plugins/contracts/dist/index';
export declare class PasswordResetGetHandler implements ICommandHandler<PasswordResetGetCommand> {
    private readonly _passwordResetService;
    constructor(_passwordResetService: PasswordResetService);
    execute(command: PasswordResetGetCommand): Promise<IPasswordReset>;
}
