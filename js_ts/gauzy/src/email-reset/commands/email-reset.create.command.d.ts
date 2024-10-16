import { ICommand } from '@nestjs/cqrs';
import { IEmailResetCreateInput } from '../../../plugins/contracts';
export declare class EmailResetCreateCommand implements ICommand {
    readonly input: IEmailResetCreateInput;
    static readonly type = "[Email Reset] Create";
    constructor(input: IEmailResetCreateInput);
}
