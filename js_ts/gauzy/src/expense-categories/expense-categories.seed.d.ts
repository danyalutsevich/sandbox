import { IExpenseCategory, IOrganization, ITenant } from '../../plugins/contracts/dist/index';
import { DataSource } from 'typeorm';
import { ExpenseCategory } from './expense-category.entity';
export declare const createExpenseCategories: (dataSource: DataSource, tenant: ITenant, organizations: IOrganization[]) => Promise<ExpenseCategory[]>;
export declare const createRandomExpenseCategories: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationMap: Map<ITenant, IOrganization[]>) => Promise<Map<IOrganization, IExpenseCategory[]>>;
