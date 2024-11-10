import { ICommand } from '@nestjs/cqrs';
import { ICustomSmtp, ICustomSmtpUpdateInput } from '../../../plugins/contracts';
export declare class CustomSmtpUpdateCommand implements ICommand {
    readonly id: ICustomSmtp['id'];
    readonly input: ICustomSmtpUpdateInput;
    static readonly type = "[Custom SMTP] Update";
    constructor(id: ICustomSmtp['id'], input: ICustomSmtpUpdateInput);
}
