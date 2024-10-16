import { GoalTimeFrame } from './goal-time-frame.entity';
import { DataSource } from 'typeorm';
import { IOrganization, ITenant } from '../../plugins/contracts/dist/index';
export declare const createDefaultTimeFrames: (dataSource: DataSource, tenant: ITenant, organizations: IOrganization[]) => Promise<GoalTimeFrame[]>;
