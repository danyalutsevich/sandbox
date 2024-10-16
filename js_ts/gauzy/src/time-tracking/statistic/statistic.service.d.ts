import { IGetActivitiesStatistics, IGetTimeSlotStatistics, IGetTasksStatistics, IGetProjectsStatistics, IGetMembersStatistics, IGetCountsStatistics, ICountsStatistics, IMembersStatistics, IActivitiesStatistics, ITimeSlotStatistics, IProjectsStatistics, IGetManualTimesStatistics, IManualTimesStatistics } from '../../../plugins/contracts';
import { ConfigService, MultiORM } from '../../../plugins/config/dist/index';
import { TypeOrmTimeSlotRepository } from '../../time-tracking/time-slot/repository/type-orm-time-slot.repository';
import { TypeOrmEmployeeRepository } from '../../employee/repository/type-orm-employee.repository';
import { TypeOrmActivityRepository } from '../activity/repository';
import { MikroOrmTimeLogRepository, TypeOrmTimeLogRepository } from '../time-log/repository';
export declare class StatisticService {
    private readonly typeOrmTimeSlotRepository;
    private readonly typeOrmEmployeeRepository;
    private readonly typeOrmActivityRepository;
    private readonly typeOrmTimeLogRepository;
    private readonly mikroOrmTimeLogRepository;
    private readonly configService;
    protected ormType: MultiORM;
    constructor(typeOrmTimeSlotRepository: TypeOrmTimeSlotRepository, typeOrmEmployeeRepository: TypeOrmEmployeeRepository, typeOrmActivityRepository: TypeOrmActivityRepository, typeOrmTimeLogRepository: TypeOrmTimeLogRepository, mikroOrmTimeLogRepository: MikroOrmTimeLogRepository, configService: ConfigService);
    /**
     * GET Time Tracking Dashboard Counts Statistics
     *
     * @param request
     * @returns
     */
    getCounts(request: IGetCountsStatistics): Promise<ICountsStatistics>;
    /**
     * GET Time Tracking Dashboard Worked Members Statistics
     *
     * @param request
     * @returns
     */
    /**
     * GET Time Tracking Dashboard Worked Members Statistics
     *
     * @param request
     * @returns
     */
    getMembers(request: IGetMembersStatistics): Promise<IMembersStatistics[]>;
    /**
     * GET Time Tracking Dashboard Projects Statistics
     *
     * @param request
     * @returns
     */
    getProjects(request: IGetProjectsStatistics): Promise<IProjectsStatistics[]>;
    /**
     * GET Time Tracking Dashboard Tasks Statistics
     *
     * @param request
     * @returns
     */
    getTasks(request: IGetTasksStatistics): Promise<{
        id: string;
        title: any;
        duration: any;
        todayDuration: any;
        updatedAt: any;
    }[]>;
    /**
     * GET Time Tracking Dashboard Manual Time Logs Statistics
     *
     * @param request
     * @returns
     */
    manualTimes(request: IGetManualTimesStatistics): Promise<IManualTimesStatistics[]>;
    /**
     * GET Time Tracking Dashboard Activities Statistics
     *
     * @param request
     * @returns
     */
    getActivities(request: IGetActivitiesStatistics): Promise<IActivitiesStatistics[]>;
    /**
     * GET Time Tracking Dashboard Time Slots Statistics
     *
     * @param request
     * @returns
     */
    getEmployeeTimeSlots(request: IGetTimeSlotStatistics): Promise<ITimeSlotStatistics[]>;
    /**
     * Get employees count who worked in this week.
     *
     * @param request
     * @returns
     */
    private getEmployeeWorkedCounts;
    /**
     * Get projects count who worked in this week.
     *
     * @param request
     * @returns
     */
    private getProjectWorkedCounts;
    /**
     * Applies filtering conditions to the given TypeORM query builder based on the provided request parameters.
     *
     * @param query The TypeORM query builder instance.
     * @param qb The TypeORM WhereExpressionBuilder instance.
     * @param request The request object containing filter parameters.
     * @returns The modified TypeORM WhereExpressionBuilder instance with applied filtering conditions.
     */
    private getFilterQuery;
}
