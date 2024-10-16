import { DataSource } from 'typeorm';
import { OrganizationRecurringExpense } from './organization-recurring-expense.entity';
import { IOrganization, ITenant } from '../../plugins/contracts/dist/index';
export declare const createDefaultOrganizationRecurringExpense: (dataSource: DataSource, tenant: ITenant, defaultOrganization: IOrganization) => Promise<OrganizationRecurringExpense[]>;
export declare const createRandomOrganizationRecurringExpense: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>) => Promise<OrganizationRecurringExpense[]>;
