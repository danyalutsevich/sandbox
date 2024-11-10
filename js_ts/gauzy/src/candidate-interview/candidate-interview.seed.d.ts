import { DataSource } from 'typeorm';
import { ICandidate, IOrganization, ITenant } from '../../plugins/contracts/dist/index';
import { CandidateInterview } from './../core/entities/internal';
export declare const createDefaultCandidateInterview: (dataSource: DataSource, tenant: ITenant, organization: IOrganization, candidates: any) => Promise<CandidateInterview[]>;
export declare const createRandomCandidateInterview: (dataSource: DataSource, tenants: ITenant[], tenantCandidatesMap: Map<ITenant, ICandidate[]> | void) => Promise<CandidateInterview[]>;
