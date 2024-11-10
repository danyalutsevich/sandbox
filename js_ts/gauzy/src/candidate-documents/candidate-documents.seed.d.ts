import { ICandidate, ICandidateDocument, IOrganization, ITenant } from '../../plugins/contracts/dist/index';
import { DataSource } from 'typeorm';
import { CandidateDocument } from './../core/entities/internal';
export declare const createCandidateDocuments: (dataSource: DataSource, tenant: ITenant, candidates: ICandidate[] | void, organization: IOrganization) => Promise<CandidateDocument[]>;
export declare const createRandomCandidateDocuments: (dataSource: DataSource, tenants: ITenant[], tenantCandidatesMap: Map<ITenant, ICandidate[]> | void) => Promise<Map<ICandidate, ICandidateDocument[]>>;
