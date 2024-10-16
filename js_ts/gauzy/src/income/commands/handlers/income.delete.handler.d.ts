import { ICommandHandler } from '@nestjs/cqrs';
import { DeleteResult } from 'typeorm';
import { IncomeService } from '../../income.service';
import { EmployeeService } from '../../../employee/employee.service';
import { EmployeeStatisticsService } from '../../../employee-statistics';
import { IncomeDeleteCommand } from '../income.delete.command';
export declare class IncomeDeleteHandler implements ICommandHandler<IncomeDeleteCommand> {
    private readonly incomeService;
    private readonly employeeService;
    private readonly employeeStatisticsService;
    constructor(incomeService: IncomeService, employeeService: EmployeeService, employeeStatisticsService: EmployeeStatisticsService);
    execute(command: IncomeDeleteCommand): Promise<DeleteResult>;
    deleteIncome(incomeId: string): Promise<DeleteResult>;
}
