import { DataSource } from 'typeorm';
import { IOrganization, ITenant } from '../../plugins/contracts/dist/index';
export declare const createDefaultInvoice: (dataSource: DataSource, tenant: ITenant, organizations: IOrganization[], noOfInvoicePerOrganization: number) => Promise<void>;
export declare const createRandomInvoice: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>, noOfInvoicePerOrganization: number) => Promise<void>;
