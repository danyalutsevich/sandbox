import { ICandidate, IOrganization, ITenant } from '../../plugins/contracts/dist/index';
import { DataSource } from 'typeorm';
import { CandidateSkill } from './candidate-skill.entity';
export declare const createCandidateSkills: (dataSource: DataSource, tenant: ITenant, candidates: ICandidate[] | void, organization: IOrganization) => Promise<CandidateSkill[]>;
export declare const createRandomCandidateSkills: (dataSource: DataSource, tenants: ITenant[], tenantCandidatesMap: Map<ITenant, ICandidate[]> | void) => Promise<Map<ICandidate, CandidateSkill[]>>;
