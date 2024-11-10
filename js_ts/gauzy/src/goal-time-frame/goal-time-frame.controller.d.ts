import { IGoalTimeFrame, IPagination } from '../../plugins/contracts/dist/index';
import { CrudController } from './../core/crud';
import { GoalTimeFrame } from './goal-time-frame.entity';
import { GoalTimeFrameService } from './goal-time-frame.service';
import { CreateGoalTimeFrameDTO, UpdateGoalTimeFrameDTO } from './dto';
export declare class GoalTimeFrameController extends CrudController<GoalTimeFrame> {
    private readonly goalTimeFrameService;
    constructor(goalTimeFrameService: GoalTimeFrameService);
    findAll(data: any): Promise<IPagination<IGoalTimeFrame>>;
    create(entity: CreateGoalTimeFrameDTO): Promise<IGoalTimeFrame>;
    getByName(name: string): Promise<IPagination<IGoalTimeFrame>>;
    update(id: string, entity: UpdateGoalTimeFrameDTO): Promise<IGoalTimeFrame>;
    delete(id: string): Promise<any>;
}
