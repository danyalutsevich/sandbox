import { ICommand } from '@nestjs/cqrs';
import { IEmailTemplateSaveInput } from '../../../plugins/contracts';
export declare class EmailTemplateSaveCommand implements ICommand {
    readonly input: IEmailTemplateSaveInput;
    static readonly type = "[EmailTemplate] Save";
    constructor(input: IEmailTemplateSaveInput);
}
