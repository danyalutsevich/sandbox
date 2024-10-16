import { Repository } from 'typeorm';
import { GoalGeneralSetting } from '../goal-general-setting.entity';
export declare class TypeOrmGoalGeneralSettingRepository extends Repository<GoalGeneralSetting> {
    readonly repository: Repository<GoalGeneralSetting>;
    constructor(repository: Repository<GoalGeneralSetting>);
}
