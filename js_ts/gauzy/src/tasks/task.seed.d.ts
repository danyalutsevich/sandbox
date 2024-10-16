import { DataSource } from 'typeorm';
import { IGetTaskOptions, IOrganization, ITag, ITenant } from '../../plugins/contracts/dist/index';
import { Tag } from './../core/entities/internal';
export declare const createDefaultTask: (dataSource: DataSource, tenant: ITenant, organization: IOrganization) => Promise<void>;
export declare const createRandomTask: (dataSource: DataSource, tenants: ITenant[]) => Promise<void>;
export declare function createTags(dataSource: DataSource, labels: any, tenant: ITenant, organization: IOrganization): Promise<(ITag & Tag)[]>;
/**
 * GET maximum task number by project filter
 *
 * @param options
 */
export declare function getMaxTaskNumberByProject(dataSource: DataSource, options: IGetTaskOptions): Promise<any>;
