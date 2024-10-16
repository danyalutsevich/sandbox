import { ICommand } from '@nestjs/cqrs';
import { IIncomeCreateInput } from '../../../plugins/contracts';
export declare class IncomeCreateCommand implements ICommand {
    readonly input: IIncomeCreateInput;
    static readonly type = "[Income] Create";
    constructor(input: IIncomeCreateInput);
}
