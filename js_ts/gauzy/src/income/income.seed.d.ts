import { DataSource } from 'typeorm';
import { IOrganization, IEmployee, ITenant } from '../../plugins/contracts/dist/index';
import { Income } from './../core/entities/internal';
export declare const createDefaultIncomes: (dataSource: DataSource, tenant: ITenant, organizations: IOrganization[], employees: IEmployee[]) => Promise<Income[]>;
export declare const createRandomIncomes: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>, organizationEmployeesMap: Map<IOrganization, IEmployee[]>) => Promise<void>;
