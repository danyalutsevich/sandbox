import { IGoalKPITemplate, IPagination } from '../../plugins/contracts/dist/index';
import { CrudController } from './../core/crud';
import { GoalKPITemplate } from './goal-kpi-template.entity';
import { GoalKpiTemplateService } from './goal-kpi-template.service';
export declare class GoalKpiTemplateController extends CrudController<GoalKPITemplate> {
    private readonly goalKpiTemplateService;
    constructor(goalKpiTemplateService: GoalKpiTemplateService);
    /**
     * GET all goal kpi templates
     *
     * @param data
     * @returns
     */
    findAll(data: any): Promise<IPagination<IGoalKPITemplate>>;
    /**
     * CREATE goal kpi template
     *
     * @param entity
     * @returns
     */
    create(entity: GoalKPITemplate): Promise<IGoalKPITemplate>;
}
