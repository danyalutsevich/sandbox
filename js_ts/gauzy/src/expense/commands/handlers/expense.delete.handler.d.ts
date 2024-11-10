import { ICommandHandler } from '@nestjs/cqrs';
import { DeleteResult } from 'typeorm';
import { ExpenseService } from '../../expense.service';
import { EmployeeService } from '../../../employee/employee.service';
import { EmployeeStatisticsService } from '../../../employee-statistics';
import { ExpenseDeleteCommand } from '../expense.delete.command';
export declare class ExpenseDeleteHandler implements ICommandHandler<ExpenseDeleteCommand> {
    private readonly expenseService;
    private readonly employeeService;
    private readonly employeeStatisticsService;
    constructor(expenseService: ExpenseService, employeeService: EmployeeService, employeeStatisticsService: EmployeeStatisticsService);
    execute(command: ExpenseDeleteCommand): Promise<DeleteResult>;
    deleteExpense(expenseId: string): Promise<DeleteResult>;
}
