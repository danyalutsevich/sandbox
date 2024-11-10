import { IAggregatedEmployeeStatistic, IEmployeeStatistics, IMonthAggregatedEmployeeStatistics, IEmployeeStatisticsHistory } from '../../plugins/contracts/dist/index';
import { QueryBus } from '@nestjs/cqrs';
import { EmployeeStatisticsService } from './employee-statistics.service';
import { EmployeeAggregatedStatisticByMonthQueryDTO } from './dto';
export declare class EmployeeStatisticsController {
    private readonly employeeStatisticsService;
    private readonly queryBus;
    constructor(employeeStatisticsService: EmployeeStatisticsService, queryBus: QueryBus);
    findAggregatedByOrganizationId(data: any): Promise<IAggregatedEmployeeStatistic[]>;
    findAllByEmloyeeId(id: string, data?: any): Promise<IEmployeeStatistics>;
    findAggregatedStatisticsByEmployeeId(options: EmployeeAggregatedStatisticByMonthQueryDTO): Promise<IMonthAggregatedEmployeeStatistics>;
    findEmployeeStatisticsHistory(data?: any): Promise<IEmployeeStatisticsHistory[]>;
}
