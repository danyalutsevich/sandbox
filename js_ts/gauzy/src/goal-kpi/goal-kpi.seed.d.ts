import { DataSource } from 'typeorm';
import { IEmployee, IOrganization, ITenant } from '../../plugins/contracts/dist/index';
import { GoalKPI } from './goal-kpi.entity';
export declare const createDefaultGoalKpi: (dataSource: DataSource, tenant: ITenant, organizations: IOrganization[], employees: IEmployee[]) => Promise<GoalKPI[]>;
