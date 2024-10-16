import { IOrganizationRecurringExpenseByMonthFindInput } from '../../../plugins/contracts';
import { IQuery } from '@nestjs/cqrs';

export class OrganizationRecurringExpenseByMonthQuery implements IQuery {
	static readonly type = '[OrganizationRecurringExpense] By Month';

	constructor(
		public readonly input: IOrganizationRecurringExpenseByMonthFindInput
	) {}
}
