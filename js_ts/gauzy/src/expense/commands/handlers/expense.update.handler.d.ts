import { ICommandHandler } from '@nestjs/cqrs';
import { IExpense } from '../../../../plugins/contracts';
import { ExpenseService } from '../../expense.service';
import { EmployeeService } from '../../../employee/employee.service';
import { EmployeeStatisticsService } from '../../../employee-statistics';
import { ExpenseUpdateCommand } from '../expense.update.command';
export declare class ExpenseUpdateHandler implements ICommandHandler<ExpenseUpdateCommand> {
    private readonly expenseService;
    private readonly employeeService;
    private readonly employeeStatisticsService;
    constructor(expenseService: ExpenseService, employeeService: EmployeeService, employeeStatisticsService: EmployeeStatisticsService);
    execute(command: ExpenseUpdateCommand): Promise<IExpense>;
}
