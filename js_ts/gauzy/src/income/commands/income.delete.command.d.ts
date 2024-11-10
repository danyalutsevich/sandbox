import { ICommand } from '@nestjs/cqrs';
export declare class IncomeDeleteCommand implements ICommand {
    readonly employeeId: string;
    readonly incomeId: string;
    static readonly type = "[Income] Delete";
    constructor(employeeId: string, incomeId: string);
}
