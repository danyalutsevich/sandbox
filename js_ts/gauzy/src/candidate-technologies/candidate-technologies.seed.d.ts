import { DataSource } from 'typeorm';
import { ICandidate, IOrganization, ITenant } from '../../plugins/contracts/dist/index';
import { CandidateTechnologies } from './candidate-technologies.entity';
export declare const createDefaultCandidateTechnologies: (dataSource: DataSource, tenant: ITenant, organization: IOrganization, defaultCandidates: any) => Promise<CandidateTechnologies[]>;
export declare const createRandomCandidateTechnologies: (dataSource: DataSource, tenants: ITenant[], tenantCandidatesMap: Map<ITenant, ICandidate[]> | void) => Promise<CandidateTechnologies[]>;
