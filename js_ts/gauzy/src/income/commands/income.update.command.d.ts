import { ICommand } from '@nestjs/cqrs';
import { IIncome } from '../../../plugins/contracts';
export declare class IncomeUpdateCommand implements ICommand {
    readonly id: string;
    readonly entity: IIncome;
    static readonly type = "[Income] Update";
    constructor(id: string, entity: IIncome);
}
