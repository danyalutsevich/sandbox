import { DataSource } from 'typeorm';
import { IOrganization, ITenant } from '../../plugins/contracts/dist/index';
import { Equipment } from './../core/entities/internal';
export declare const createDefaultEquipments: (dataSource: DataSource, tenant: ITenant, organization: IOrganization) => Promise<Equipment[]>;
export declare const createRandomEquipments: (dataSource: DataSource, tenants: ITenant[], noOfEquipmentsPerTenant: number) => Promise<Equipment[]>;
