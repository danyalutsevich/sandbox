import { ICommandHandler } from '@nestjs/cqrs';
import { PasswordResetCreateCommand } from './../password-reset.create.command';
import { PasswordResetService } from './../../password-reset.service';
export declare class PasswordResetCreateHandler implements ICommandHandler<PasswordResetCreateCommand> {
    private readonly _passwordResetService;
    constructor(_passwordResetService: PasswordResetService);
    /**
     * Execute a command to create a password reset request.
     *
     * @param {PasswordResetCreateCommand} command - The command object containing information for password reset creation.
     * @returns {Promise<any>} A Promise that resolves to the result of the password reset creation process or rejects with a BadRequestException in case of an error.
     */
    execute(command: PasswordResetCreateCommand): Promise<any>;
}
