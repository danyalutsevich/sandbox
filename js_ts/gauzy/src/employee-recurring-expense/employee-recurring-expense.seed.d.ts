import { DataSource } from 'typeorm';
import { IEmployee, IOrganization, ITenant } from '../../plugins/contracts/dist/index';
import { EmployeeRecurringExpense } from './employee-recurring-expense.entity';
export declare const createRandomEmployeeRecurringExpense: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>, organizationEmployeesMap: Map<IOrganization, IEmployee[]>) => Promise<EmployeeRecurringExpense[]>;
