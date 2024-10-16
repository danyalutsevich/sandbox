import { DataSource } from 'typeorm';
import { IOrganization, IRequestApprovalTeam, ITenant } from '../../plugins/contracts/dist/index';
export declare const createRandomRequestApprovalTeam: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>) => Promise<IRequestApprovalTeam[]>;
