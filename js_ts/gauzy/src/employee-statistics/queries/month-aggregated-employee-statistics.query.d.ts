import { IMonthAggregatedEmployeeStatisticsFindInput } from '../../../plugins/contracts';
import { IQuery } from '@nestjs/cqrs';
export declare class MonthAggregatedEmployeeStatisticsQuery implements IQuery {
    readonly input: IMonthAggregatedEmployeeStatisticsFindInput;
    static readonly type = "[MonthAggregatedEmployeeStatistics] Employee Statistics";
    constructor(input: IMonthAggregatedEmployeeStatisticsFindInput);
}
