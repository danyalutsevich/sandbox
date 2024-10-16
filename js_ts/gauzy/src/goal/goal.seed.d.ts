import { Goal } from './goal.entity';
import { DataSource } from 'typeorm';
import { IEmployee, IOrganization, ITenant } from '../../plugins/contracts/dist/index';
export declare const createDefaultGoals: (dataSource: DataSource, tenant: ITenant, organizations: IOrganization[], employees: IEmployee[]) => Promise<Goal[]>;
export declare const updateDefaultGoalProgress: (dataSource: DataSource) => Promise<Goal[]>;
export declare const createRandomGoal: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>, organizationEmployeesMap: Map<IOrganization, IEmployee[]>) => Promise<Goal[]>;
