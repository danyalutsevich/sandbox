import { DataSource } from "typeorm";
import { ITenant } from '../../../plugins/contracts';
import { TenantSetting } from "./tenant-setting.entity";
/**
 *
 * @param dataSource
 * @param tenants
 * @returns
 */
export declare const createDefaultTenantSetting: (dataSource: DataSource, tenants: ITenant[]) => Promise<TenantSetting[]>;
