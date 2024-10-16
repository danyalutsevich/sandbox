import { DeleteResult } from 'typeorm';
import { IGoal, IPagination } from '../../plugins/contracts/dist/index';
import { GoalService } from './goal.service';
import { Goal } from './goal.entity';
import { CrudController } from './../core/crud';
import { CreateGoalDTO, UpdateGoalDTO } from './dto';
export declare class GoalController extends CrudController<Goal> {
    private readonly goalService;
    constructor(goalService: GoalService);
    create(entity: CreateGoalDTO): Promise<IGoal>;
    findAll(data: any): Promise<IPagination<IGoal>>;
    update(id: string, entity: UpdateGoalDTO): Promise<IGoal>;
    delete(id: string): Promise<DeleteResult>;
}
