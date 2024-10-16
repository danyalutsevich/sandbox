import { ICommandHandler } from '@nestjs/cqrs';
import { GauzyAIService } from '../../../../plugins/plugins/integration-ai/dist/index';
import { IEmployee, IPagination } from '../../../../plugins/contracts/dist/index';
import { EmployeeService } from '../../employee.service';
import { GetEmployeeJobStatisticsCommand } from '../get-employee-job-statistics.command';
export declare class GetEmployeeJobStatisticsHandler implements ICommandHandler<GetEmployeeJobStatisticsCommand> {
    private readonly employeeService;
    private readonly gauzyAIService;
    /**
     *
     * @param employeeService
     * @param gauzyAIService
     */
    constructor(employeeService: EmployeeService, gauzyAIService: GauzyAIService);
    /**
     * Executes the GetEmployeeJobStatisticsCommand to fetch paginated employee data
     * and augment it with additional statistics.
     *
     * @param command - The command containing options for pagination.
     * @returns A Promise resolving to an IPagination<IEmployee> with augmented data.
     */
    execute(command: GetEmployeeJobStatisticsCommand): Promise<IPagination<IEmployee>>;
}
