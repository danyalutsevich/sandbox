import { Repository } from 'typeorm';
import { GoalKPITemplate } from '../goal-kpi-template.entity';
export declare class TypeOrmGoalKPITemplateRepository extends Repository<GoalKPITemplate> {
    readonly repository: Repository<GoalKPITemplate>;
    constructor(repository: Repository<GoalKPITemplate>);
}
