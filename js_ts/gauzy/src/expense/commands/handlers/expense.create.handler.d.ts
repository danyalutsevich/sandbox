import { ICommandHandler } from '@nestjs/cqrs';
import { IExpense } from '../../../../plugins/contracts';
import { ExpenseCreateCommand } from '../expense.create.command';
import { ExpenseService } from '../../expense.service';
import { EmployeeService } from '../../../employee/employee.service';
import { EmployeeStatisticsService } from '../../../employee-statistics';
export declare class ExpenseCreateHandler implements ICommandHandler<ExpenseCreateCommand> {
    private readonly expenseService;
    private readonly employeeService;
    private readonly employeeStatisticsService;
    constructor(expenseService: ExpenseService, employeeService: EmployeeService, employeeStatisticsService: EmployeeStatisticsService);
    execute(command: ExpenseCreateCommand): Promise<IExpense>;
}
