import { IKPI, IPagination } from '../../plugins/contracts/dist/index';
import { CrudController } from './../core/crud';
import { GoalKPI } from './goal-kpi.entity';
import { GoalKpiService } from './goal-kpi.service';
export declare class GoalKpiController extends CrudController<GoalKPI> {
    private readonly goalKpiService;
    constructor(goalKpiService: GoalKpiService);
    findAll(data: any): Promise<IPagination<IKPI>>;
    create(entity: GoalKPI): Promise<IKPI>;
    update(id: string, entity: GoalKPI): Promise<IKPI>;
    delete(id: string): Promise<any>;
}
