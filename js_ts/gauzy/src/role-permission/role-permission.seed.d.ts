import { DataSource } from 'typeorm';
import { IRole, ITenant } from '../../plugins/contracts/dist/index';
export declare const createRolePermissions: (dataSource: DataSource, roles: IRole[], tenants: ITenant[]) => Promise<void>;
