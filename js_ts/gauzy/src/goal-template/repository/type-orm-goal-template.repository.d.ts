import { Repository } from 'typeorm';
import { GoalTemplate } from '../goal-template.entity';
export declare class TypeOrmGoalTemplateRepository extends Repository<GoalTemplate> {
    readonly repository: Repository<GoalTemplate>;
    constructor(repository: Repository<GoalTemplate>);
}
