import { IOrganization, ITenant } from '../../plugins/contracts/dist/index';
import { DataSource } from 'typeorm';
import { GoalGeneralSetting } from './goal-general-setting.entity';
export declare const createDefaultGeneralGoalSetting: (dataSource: DataSource, tenant: ITenant, organizations: IOrganization[]) => Promise<GoalGeneralSetting[]>;
