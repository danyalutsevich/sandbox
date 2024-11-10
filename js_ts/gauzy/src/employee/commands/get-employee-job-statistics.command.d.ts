import { ICommand } from '@nestjs/cqrs';
import { PaginationParams } from './../../core/crud';
import { Employee } from './../employee.entity';
export declare class GetEmployeeJobStatisticsCommand implements ICommand {
    readonly options: PaginationParams<Employee>;
    static readonly type = "[EmployeeJobStatistics] Get";
    constructor(options: PaginationParams<Employee>);
}
