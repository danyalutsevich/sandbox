import { DataSource } from 'typeorm';
import { ICandidate, IOrganization, ITenant } from '../../plugins/contracts/dist/index';
import { CandidatePersonalQualities } from './candidate-personal-qualities.entity';
export declare const createDefaultCandidatePersonalQualities: (dataSource: DataSource, tenant: ITenant, organization: IOrganization, defaultCandidates: any) => Promise<CandidatePersonalQualities[]>;
export declare const createRandomCandidatePersonalQualities: (dataSource: DataSource, tenants: ITenant[], tenantCandidatesMap: Map<ITenant, ICandidate[]> | void) => Promise<CandidatePersonalQualities[]>;
