import { IGoalGeneralSetting, IPagination } from '../../plugins/contracts/dist/index';
import { CrudController } from './../core/crud';
import { GoalGeneralSetting } from './goal-general-setting.entity';
import { GoalGeneralSettingService } from './goal-general-setting.service';
import { CreateGoalGeneralSettingDTO, UpdateGoalGeneralSettingDTO } from './dto';
export declare class GoalGeneralSettingController extends CrudController<GoalGeneralSetting> {
    private readonly goalGeneralSettingService;
    constructor(goalGeneralSettingService: GoalGeneralSettingService);
    findAll(data: any): Promise<IPagination<IGoalGeneralSetting>>;
    create(entity: CreateGoalGeneralSettingDTO): Promise<IGoalGeneralSetting>;
    update(id: string, entity: UpdateGoalGeneralSettingDTO): Promise<IGoalGeneralSetting>;
}
