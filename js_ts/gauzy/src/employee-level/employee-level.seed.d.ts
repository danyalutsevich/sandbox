import { DataSource } from 'typeorm';
import { IEmployeeLevelInput, IOrganization, ITenant } from '../../plugins/contracts/dist/index';
export declare const createEmployeeLevels: (dataSource: DataSource, tenant: ITenant, organizations: IOrganization[]) => Promise<IEmployeeLevelInput[]>;
