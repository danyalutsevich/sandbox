import { TenantAwareCrudService } from './../core/crud';
import { GoalKPITemplate } from './goal-kpi-template.entity';
import { MikroOrmGoalKPITemplateRepository } from './repository/mikro-orm-goal-kpi-template.repository';
import { TypeOrmGoalKPITemplateRepository } from './repository/type-orm-goal-kpi-template.repository';
export declare class GoalKpiTemplateService extends TenantAwareCrudService<GoalKPITemplate> {
    constructor(typeOrmGoalKPITemplateRepository: TypeOrmGoalKPITemplateRepository, mikroOrmGoalKPITemplateRepository: MikroOrmGoalKPITemplateRepository);
}
