import { GoalKPI } from './goal-kpi.entity';
import { TenantAwareCrudService } from './../core/crud';
import { MikroOrmGoalKPIRepository } from './repository/mikro-orm-goal-kpi.repository';
import { TypeOrmGoalKPIRepository } from './repository/type-orm-goal-kpi.repository';
export declare class GoalKpiService extends TenantAwareCrudService<GoalKPI> {
    constructor(typeOrmGoalKPIRepository: TypeOrmGoalKPIRepository, mikroOrmGoalKPIRepository: MikroOrmGoalKPIRepository);
}
