import { IOrganization, ITenant } from '../../plugins/contracts/dist/index';
import { DataSource } from 'typeorm';
import { Skill } from './skill.entity';
export declare const createDefaultSkills: (dataSource: DataSource, tenant: ITenant, organization: IOrganization) => Promise<Skill[]>;
