import { IAggregatedEmployeeStatisticFindInput } from '../../../plugins/contracts';
import { IQuery } from '@nestjs/cqrs';
export declare class AggregatedEmployeeStatisticQuery implements IQuery {
    readonly input: IAggregatedEmployeeStatisticFindInput;
    static readonly type = "[EmployeeStatistic] Aggregated Employee Statistic";
    constructor(input: IAggregatedEmployeeStatisticFindInput);
}
