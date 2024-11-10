import { ICommandHandler } from '@nestjs/cqrs';
import { OrganizationRecurringExpenseService } from '../../organization-recurring-expense.service';
import { OrganizationRecurringExpenseCreateCommand } from '../organization-recurring-expense.create.command';
export declare class OrganizationRecurringExpenseCreateHandler implements ICommandHandler<OrganizationRecurringExpenseCreateCommand> {
    private readonly organizationRecurringExpenseService;
    constructor(organizationRecurringExpenseService: OrganizationRecurringExpenseService);
    execute(command: OrganizationRecurringExpenseCreateCommand): Promise<any>;
}
