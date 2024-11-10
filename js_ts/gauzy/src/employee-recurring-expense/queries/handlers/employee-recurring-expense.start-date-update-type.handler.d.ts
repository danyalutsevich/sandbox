import { IStartUpdateTypeInfo } from '../../../../plugins/contracts/dist/index';
import { IQueryHandler } from '@nestjs/cqrs';
import { FindRecurringExpenseStartDateUpdateTypeHandler } from '../../../shared/handlers/recurring-expense.find-update-type.handler';
import { EmployeeRecurringExpense } from '../../employee-recurring-expense.entity';
import { EmployeeRecurringExpenseService } from '../../employee-recurring-expense.service';
import { EmployeeRecurringExpenseStartDateUpdateTypeQuery } from '../employee-recurring-expense.update-type.query';
export declare class EmployeeRecurringExpenseUpdateTypeHandler extends FindRecurringExpenseStartDateUpdateTypeHandler<EmployeeRecurringExpense> implements IQueryHandler<EmployeeRecurringExpenseStartDateUpdateTypeQuery> {
    private readonly employeeRecurringExpenseService;
    constructor(employeeRecurringExpenseService: EmployeeRecurringExpenseService);
    execute(command: EmployeeRecurringExpenseStartDateUpdateTypeQuery): Promise<IStartUpdateTypeInfo>;
}
