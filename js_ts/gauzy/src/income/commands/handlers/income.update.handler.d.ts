import { ICommandHandler } from '@nestjs/cqrs';
import { IIncome } from '../../../../plugins/contracts';
import { IncomeService } from '../../income.service';
import { EmployeeService } from '../../../employee/employee.service';
import { EmployeeStatisticsService } from '../../../employee-statistics';
import { IncomeUpdateCommand } from '../income.update.command';
export declare class IncomeUpdateHandler implements ICommandHandler<IncomeUpdateCommand> {
    private readonly incomeService;
    private readonly employeeService;
    private readonly employeeStatisticsService;
    constructor(incomeService: IncomeService, employeeService: EmployeeService, employeeStatisticsService: EmployeeStatisticsService);
    execute(command: IncomeUpdateCommand): Promise<IIncome>;
}
