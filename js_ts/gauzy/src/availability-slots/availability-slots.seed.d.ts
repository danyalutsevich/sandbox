import { DataSource } from 'typeorm';
import { IEmployee, IOrganization, ITenant } from '../../plugins/contracts/dist/index';
import { AvailabilitySlot } from './availability-slots.entity';
export declare const createDefaultAvailabilitySlots: (dataSource: DataSource, tenants: ITenant[], organization: IOrganization, employees: any, noOfAvailabilitySlotsPerOrganization: number) => Promise<AvailabilitySlot[]>;
export declare const createRandomAvailabilitySlots: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>, organizationEmployeesMap: Map<IOrganization, IEmployee[]>, noOfAvailabilitySlotsPerOrganization: number) => Promise<AvailabilitySlot[]>;
