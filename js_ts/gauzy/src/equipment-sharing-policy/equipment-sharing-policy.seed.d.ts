import { DataSource } from 'typeorm';
import { IOrganization, ITenant } from '../../plugins/contracts/dist/index';
import { EquipmentSharingPolicy } from './equipment-sharing-policy.entity';
export declare const createDefaultEquipmentSharingPolicy: (dataSource: DataSource, tenant: ITenant, organizations: IOrganization[]) => Promise<void>;
export declare const createRandomEquipmentSharingPolicy: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>) => Promise<EquipmentSharingPolicy[]>;
