import { DataSource } from 'typeorm';
import { IEmployee, IOrganization, ITenant } from '../../plugins/contracts/dist/index';
import { EventType } from './../core/entities/internal';
export declare const createRandomEventType: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>, organizationEmployeesMap: Map<IOrganization, IEmployee[]>) => Promise<EventType[]>;
export declare const createDefaultEventTypes: (dataSource: DataSource, tenant: ITenant, organizations: IOrganization[]) => Promise<EventType[]>;
