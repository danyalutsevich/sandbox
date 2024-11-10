import { DataSource } from 'typeorm';
import { ICandidate, ICandidateFeedback, IOrganization, ITenant } from '../../plugins/contracts/dist/index';
export declare const createCandidateFeedbacks: (dataSource: DataSource, tenant: ITenant, organization: IOrganization, candidates: ICandidate[] | void) => Promise<Map<ICandidate, ICandidateFeedback[]>>;
export declare const createRandomCandidateFeedbacks: (dataSource: DataSource, tenants: ITenant[], tenantCandidatesMap: Map<ITenant, ICandidate[]> | void) => Promise<Map<ICandidate, ICandidateFeedback[]>>;
