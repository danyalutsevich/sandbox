import { IGoalTemplate, IPagination } from '../../plugins/contracts/dist/index';
import { GoalTemplateService } from './goal-template.service';
import { CrudController } from './../core/crud';
import { GoalTemplate } from './goal-template.entity';
export declare class GoalTemplateController extends CrudController<GoalTemplate> {
    private readonly goalTemplateService;
    constructor(goalTemplateService: GoalTemplateService);
    /**
     * GET all goal templates
     *
     * @param data
     * @returns
     */
    findAll(data: any): Promise<IPagination<IGoalTemplate>>;
    /**
     * CREATE goal template
     *
     * @param entity
     * @returns
     */
    create(entity: GoalTemplate): Promise<IGoalTemplate>;
}
