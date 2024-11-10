import { DataSource } from 'typeorm';
import { ICandidate, IOrganization, ITenant } from '../../plugins/contracts/dist/index';
import { CandidateCriterionsRating } from './candidate-criterion-rating.entity';
export declare const createDefaultCandidateCriterionRating: (dataSource: DataSource, tenant: ITenant, organization: IOrganization, defaultCandidates: any) => Promise<CandidateCriterionsRating[]>;
export declare const createRandomCandidateCriterionRating: (dataSource: DataSource, tenants: ITenant[], tenantCandidatesMap: Map<ITenant, ICandidate[]> | void) => Promise<CandidateCriterionsRating[]>;
