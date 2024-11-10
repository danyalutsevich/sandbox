import { ICommandHandler } from '@nestjs/cqrs';
import { IIncome } from '../../../../plugins/contracts';
import { IncomeCreateCommand } from '../income.create.command';
import { IncomeService } from '../../income.service';
import { EmployeeService } from '../../../employee/employee.service';
import { EmployeeStatisticsService } from '../../../employee-statistics';
export declare class IncomeCreateHandler implements ICommandHandler<IncomeCreateCommand> {
    private readonly incomeService;
    private readonly employeeService;
    private readonly employeeStatisticsService;
    constructor(incomeService: IncomeService, employeeService: EmployeeService, employeeStatisticsService: EmployeeStatisticsService);
    execute(command: IncomeCreateCommand): Promise<IIncome>;
}
