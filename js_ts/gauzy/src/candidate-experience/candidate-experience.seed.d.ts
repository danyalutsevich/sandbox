import { DataSource } from 'typeorm';
import { Tenant } from '../tenant/tenant.entity';
import { ICandidate } from '../../plugins/contracts/dist/index';
import { CandidateExperience } from './candidate-experience.entity';
export declare const createRandomCandidateExperience: (dataSource: DataSource, tenants: Tenant[], tenantCandidatesMap: Map<Tenant, ICandidate[]> | void) => Promise<CandidateExperience[]>;
