import { IBulkActivitiesInput } from '../../../plugins/contracts';
import { ActivityService } from './activity.service';
import { ActivityMapService } from './activity.map.service';
import { ActivityQueryDTO } from './dto/query';
export declare class ActivityController {
    private readonly activityService;
    private readonly activityMapService;
    constructor(activityService: ActivityService, activityMapService: ActivityMapService);
    getActivities(options: ActivityQueryDTO): Promise<import("../../../plugins/contracts").IActivity[]>;
    getDailyActivities(options: ActivityQueryDTO): Promise<import("../../../plugins/contracts").IDailyActivity[]>;
    getDailyActivitiesReport(options: ActivityQueryDTO): Promise<import("../../../plugins/contracts").IActivity[]>;
    bulkSaveActivities(entities: IBulkActivitiesInput): Promise<any>;
}
