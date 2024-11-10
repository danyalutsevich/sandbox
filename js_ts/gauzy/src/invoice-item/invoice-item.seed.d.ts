import { DataSource } from 'typeorm';
import { IOrganization, ITenant } from '../../plugins/contracts/dist/index';
export declare const createDefaultInvoiceItem: (dataSource: DataSource, tenant: ITenant, organizations: IOrganization[], numberOfInvoiceItemPerInvoice: number) => Promise<void>;
export declare const createRandomInvoiceItem: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>, numberOfInvoiceItemPerInvoice: number) => Promise<void>;
