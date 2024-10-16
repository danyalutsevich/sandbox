import { ICommand } from '@nestjs/cqrs';
import { IContactCreateInput } from '../../../plugins/contracts';
export declare class ContactCreateCommand implements ICommand {
    readonly input: IContactCreateInput;
    static readonly type = "[Contact] Create Contact";
    constructor(input: IContactCreateInput);
}
