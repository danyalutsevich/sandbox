import { IActivity } from '../../../plugins/contracts';
export declare class ActivityMapService {
    constructor();
    mapByDate(activities: IActivity[]): any;
    mapByEmployee(activities: IActivity[]): any;
    mapByProject(activities: IActivity[]): any;
    private groupByProject;
    private groupByDate;
    private groupByEmployee;
    private mapActivitiesPercentage;
    private getDurationSum;
}
