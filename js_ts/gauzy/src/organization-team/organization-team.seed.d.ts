import { DataSource } from 'typeorm';
import { OrganizationTeam } from './organization-team.entity';
import { IEmployee, IOrganization, IRole, ITenant } from '../../plugins/contracts/dist/index';
export declare const createDefaultTeams: (dataSource: DataSource, organization: IOrganization, employees: IEmployee[], roles: IRole[]) => Promise<OrganizationTeam[]>;
export declare const createRandomTeam: (dataSource: DataSource, tenants: ITenant[], roles: IRole[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>, organizationEmployeesMap: Map<IOrganization, IEmployee[]>) => Promise<OrganizationTeam[]>;
