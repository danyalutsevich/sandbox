import { DataSource } from 'typeorm';
import { GoalTemplate } from './goal-template.entity';
import { IOrganization, ITenant } from '../../plugins/contracts/dist/index';
export declare const createDefaultGoalTemplates: (dataSource: DataSource, tenant: ITenant, organization: IOrganization) => Promise<GoalTemplate[]>;
