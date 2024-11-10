import { ApplicationPluginConfig } from '../../plugins/common/dist/index';
import { IReport, ITenant } from '../../plugins/contracts/dist/index';
import { DataSource } from 'typeorm';
export declare const createDefaultReport: (dataSource: DataSource, config: Partial<ApplicationPluginConfig>, tenant: ITenant) => Promise<IReport[]>;
export declare function createRandomTenantOrganizationsReport(dataSource: DataSource, tenants: ITenant[]): Promise<void>;
