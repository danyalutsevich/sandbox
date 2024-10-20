import { IQuery } from '@nestjs/cqrs';
import { IOrganizationRecurringExpenseFindInput } from '../../../plugins/contracts';

export class OrganizationRecurringExpenseFindSplitExpenseQuery
	implements IQuery {
	static readonly type = '[OrganizationRecurringExpense] Find Split Expense';

	constructor(
		public readonly orgId: string,
		public readonly findInput: IOrganizationRecurringExpenseFindInput
	) {}
}
