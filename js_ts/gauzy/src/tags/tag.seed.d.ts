import { DataSource } from 'typeorm';
import { IOrganization, ITenant } from '../../plugins/contracts/dist/index';
import { Tag } from './../core/entities/internal';
export declare const createDefaultTags: (dataSource: DataSource, tenant: ITenant, organizations: IOrganization[]) => Promise<Tag[]>;
export declare const createTags: (dataSource: DataSource) => Promise<Tag[]>;
export declare const createRandomOrganizationTags: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>) => Promise<Tag[]>;
