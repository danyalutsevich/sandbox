import { ICountsStatistics, IMembersStatistics, IProjectsStatistics, ITask, IActivitiesStatistics, ITimeSlotStatistics, IManualTimesStatistics } from '../../../plugins/contracts';
import { TimeTrackingStatisticQueryDTO } from './dto';
import { StatisticService } from './statistic.service';
export declare class StatisticController {
    private readonly statisticService;
    constructor(statisticService: StatisticService);
    /**
     * Retrieve statistics for counts based on the provided query parameters.
     * @summary Get statistics for counts.
     * @param {TimeTrackingStatisticQueryDTO} request - The query parameters for fetching count statistics.
     * @returns {Promise<ICountsStatistics>} - Statistics for counts.
     */
    getCountsStatistics(request: TimeTrackingStatisticQueryDTO): Promise<ICountsStatistics>;
    /**
     * Retrieve statistics for members based on the provided query parameters.
     * @summary Get statistics for members.
     * @param {TimeTrackingStatisticQueryDTO} request - The query parameters for fetching member statistics.
     * @returns {Promise<IMembersStatistics[]>} - An array of statistics for members.
     */
    getMembersStatistics(request: TimeTrackingStatisticQueryDTO): Promise<IMembersStatistics[]>;
    /**
     * Retrieve statistics for projects based on the provided query parameters.
     * @summary Get statistics for projects.
     * @param {TimeTrackingStatisticQueryDTO} request - The query parameters for fetching project statistics.
     * @returns {Promise<IProjectsStatistics[]>} - An array of statistics for projects.
     */
    getProjectsStatistics(request: TimeTrackingStatisticQueryDTO): Promise<IProjectsStatistics[]>;
    /**
     * Retrieve statistics for tasks based on the provided query parameters.
     * @summary Get statistics for tasks.
     * @param {TimeTrackingStatisticQueryDTO} request - The query parameters for fetching task statistics.
     * @returns {Promise<ITask[]>} - An array of statistics for tasks.
     */
    getTasksStatistics(request: TimeTrackingStatisticQueryDTO): Promise<ITask[]>;
    /**
     * Retrieve statistics for manual times based on the provided query parameters.
     * @summary Get statistics for manual times.
     * @param {TimeTrackingStatisticQueryDTO} request - The query parameters for fetching manual times statistics.
     * @returns {Promise<IManualTimesStatistics[]>} - An array of statistics for manual times.
     */
    getManualTimesStatistics(request: TimeTrackingStatisticQueryDTO): Promise<IManualTimesStatistics[]>;
    /**
     * Retrieve statistics for employee time slots based on the provided query parameters.
     * @summary Get statistics for employee time slots.
     * @param {TimeTrackingStatisticQueryDTO} request - The query parameters for fetching employee time slot statistics.
     * @returns {Promise<ITimeSlotStatistics[]>} - An array of statistics for employee time slots.
     */
    getEmployeeTimeSlotsStatistics(request: TimeTrackingStatisticQueryDTO): Promise<ITimeSlotStatistics[]>;
    /**
     * Get statistics for activities based on the provided query parameters.
     * @summary Retrieve statistics for activities.
     * @param {TimeTrackingStatisticQueryDTO} request - The query parameters for fetching activity statistics.
     * @returns {Promise<IActivitiesStatistics[]>} - An array of activity statistics.
     */
    getActivitiesStatistics(request: TimeTrackingStatisticQueryDTO): Promise<IActivitiesStatistics[]>;
}
