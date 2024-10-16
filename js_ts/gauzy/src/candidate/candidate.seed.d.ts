import { DataSource } from 'typeorm';
import { IUser, ISeedUsers, IOrganization, ITenant, ICandidate } from '../../plugins/contracts/dist/index';
import { Candidate } from './../core/entities/internal';
export declare const createDefaultCandidates: (dataSource: DataSource, tenant: ITenant, organization: IOrganization, users: IUser[]) => Promise<Candidate[]>;
export declare const createRandomCandidates: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>, tenantUsersMap: Map<ITenant, ISeedUsers>, candidatesPerOrganization: number) => Promise<Map<ITenant, ICandidate[]>>;
