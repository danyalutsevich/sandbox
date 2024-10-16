import { LanguagesEnum } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class InvoiceSendEmailCommand implements ICommand {
    readonly languageCode: LanguagesEnum;
    readonly email: string;
    readonly params: any;
    readonly origin: string;
    static readonly type = "[Invoice] Send Email";
    constructor(languageCode: LanguagesEnum, email: string, params: any, origin: string);
}
