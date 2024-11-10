import { DataSource } from 'typeorm';
import { IRole, ITenant } from '../../plugins/contracts/dist/index';
export declare const createRoles: (dataSource: DataSource, tenants: ITenant[]) => Promise<IRole[]>;
