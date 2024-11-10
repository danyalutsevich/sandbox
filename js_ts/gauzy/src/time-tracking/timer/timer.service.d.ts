import { CommandBus } from '@nestjs/cqrs';
import { ITimerStatus, ITimerToggleInput, ITimerStatusInput, ITimeLog, IEmployee, IEmployeeFindInput } from '../../../plugins/contracts';
import { TimeLog } from '../../core/entities/internal';
import { MultiORM } from '../../core/utils';
import { MikroOrmTimeLogRepository, TypeOrmTimeLogRepository } from '../time-log/repository';
import { TypeOrmEmployeeRepository, MikroOrmEmployeeRepository } from '../../employee/repository';
export declare class TimerService {
    readonly typeOrmTimeLogRepository: TypeOrmTimeLogRepository;
    readonly mikroOrmTimeLogRepository: MikroOrmTimeLogRepository;
    readonly typeOrmEmployeeRepository: TypeOrmEmployeeRepository;
    readonly mikroOrmEmployeeRepository: MikroOrmEmployeeRepository;
    readonly commandBus: CommandBus;
    protected ormType: MultiORM;
    constructor(typeOrmTimeLogRepository: TypeOrmTimeLogRepository, mikroOrmTimeLogRepository: MikroOrmTimeLogRepository, typeOrmEmployeeRepository: TypeOrmEmployeeRepository, mikroOrmEmployeeRepository: MikroOrmEmployeeRepository, commandBus: CommandBus);
    /**
     * Fetches an employee based on the provided query.
     *
     * @param query - The query parameters to find the employee.
     * @returns A Promise resolving to the employee entity or null.
     */
    fetchEmployee(query: IEmployeeFindInput): Promise<IEmployee | null>;
    /**
     * Get timer status
     *
     * @param request
     * @returns
     */
    getTimerStatus(request: ITimerStatusInput): Promise<ITimerStatus>;
    /**
     * Start time tracking
     *
     * @param request
     * @returns
     */
    startTimer(request: ITimerToggleInput): Promise<ITimeLog>;
    /**
     * Stop time tracking
     *
     * @param request
     * @returns
     */
    stopTimer(request: ITimerToggleInput): Promise<ITimeLog>;
    /**
     * Toggle time tracking start/stop
     *
     * @param request
     * @returns
     */
    toggleTimeLog(request: ITimerToggleInput): Promise<TimeLog>;
    /**
     * Get employee last running timer
     *
     * @param request
     * @returns
     */
    private getLastRunningLog;
    /**
     * Get timer worked status
     *
     * @param request The input parameters for the query.
     * @returns The timer status for the employee.
     */
    getTimerWorkedStatus(request: ITimerStatusInput): Promise<ITimerStatus[]>;
}
