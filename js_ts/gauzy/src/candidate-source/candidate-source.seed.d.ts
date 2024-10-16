import { DataSource } from 'typeorm';
import { ICandidate, ICandidateSource, IOrganization, ITenant } from '../../plugins/contracts/dist/index';
import { CandidateSource } from './../core/entities/internal';
export declare const createCandidateSources: (dataSource: DataSource, tenant: ITenant, candidates: ICandidate[] | void, organization: IOrganization) => Promise<CandidateSource[]>;
export declare const createRandomCandidateSources: (dataSource: DataSource, tenants: ITenant[], tenantCandidatesMap: Map<ITenant, ICandidate[]> | void) => Promise<Map<ICandidate, ICandidateSource[]>>;
