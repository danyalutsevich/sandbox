import { ICommand } from '@nestjs/cqrs';
import { ICustomSmtpCreateInput } from '../../../plugins/contracts';
export declare class CustomSmtpCreateCommand implements ICommand {
    readonly input: ICustomSmtpCreateInput;
    static readonly type = "[Custom SMTP] Create";
    constructor(input: ICustomSmtpCreateInput);
}
