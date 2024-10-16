import { EntityRepositoryType } from '@mikro-orm/knex';
import { DailyPlanStatusEnum, IDailyPlan, IEmployee, ITask } from '../../../plugins/contracts';
import { TenantOrganizationBaseEntity } from '../../core/entities/internal';
import { MikroOrmDailyPlanRepository } from './repository';
export declare class DailyPlan extends TenantOrganizationBaseEntity implements IDailyPlan {
    [EntityRepositoryType]?: MikroOrmDailyPlanRepository;
    date: Date;
    workTimePlanned: number;
    status: DailyPlanStatusEnum;
    /**
     * Employee
     */
    employee?: IEmployee;
    employeeId?: IEmployee['id'];
    /**
     * Daily Planned Tasks
     */
    tasks?: ITask[];
}
