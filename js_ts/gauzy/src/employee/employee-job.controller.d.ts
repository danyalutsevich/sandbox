import { CommandBus } from '@nestjs/cqrs';
import { UpdateResult } from 'typeorm';
import { IEmployee, IPagination } from '../../plugins/contracts/dist/index';
import { PaginationParams } from '../core/crud';
import { EmployeeJobStatisticDTO } from './dto';
import { Employee } from './employee.entity';
export declare class EmployeeJobController {
    private readonly _commandBus;
    constructor(_commandBus: CommandBus);
    /**
     * GET employee job statistics.
     *
     * This endpoint retrieves statistics related to employee jobs,
     * providing details about job distribution, assignments, or other related data.
     *
     * @param options Pagination parameters for retrieving the data.
     * @returns A paginated list of employee job statistics.
     */
    getEmployeeJobsStatistics(options: PaginationParams<Employee>): Promise<IPagination<IEmployee>>;
    /**
     * UPDATE employee's job search status by their IDs
     *
     * This endpoint allows updating the job search status of an employee, given their ID.
     *
     * @param employeeId The unique identifier of the employee whose job search status is being updated.
     * @param entity The updated job search status information.
     * @returns A promise resolving to the updated employee record or an update result.
     */
    updateJobSearchStatus(employeeId: IEmployee['id'], data: EmployeeJobStatisticDTO): Promise<IEmployee | UpdateResult>;
}
