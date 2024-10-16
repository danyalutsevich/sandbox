import { IQuery } from '@nestjs/cqrs';
import { IEmployeeStatisticsHistoryFindInput } from '../../../plugins/contracts';
export declare class EmployeeStatisticsHistoryQuery implements IQuery {
    readonly input: IEmployeeStatisticsHistoryFindInput;
    static readonly type = "[EmployeeStatistics] History";
    constructor(input: IEmployeeStatisticsHistoryFindInput);
}
