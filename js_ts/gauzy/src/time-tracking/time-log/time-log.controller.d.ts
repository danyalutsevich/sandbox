import { CommandBus } from '@nestjs/cqrs';
import { DeleteResult, FindOneOptions, UpdateResult } from 'typeorm';
import { ITimeLog, IGetTimeLogConflictInput } from '../../../plugins/contracts';
import { TimeLogService } from './time-log.service';
import { CreateManualTimeLogDTO, DeleteTimeLogDTO, UpdateManualTimeLogDTO } from './dto';
import { TimeLogLimitQueryDTO, TimeLogQueryDTO } from './dto/query';
export declare class TimeLogController {
    private readonly timeLogService;
    private readonly commandBus;
    constructor(timeLogService: TimeLogService, commandBus: CommandBus);
    /**
     * Get conflicting timer logs based on the provided entity.
     * @param entity The entity with information for checking conflicts.
     * @returns An array of conflicting timer logs.
     */
    getConflict(request: IGetTimeLogConflictInput): Promise<ITimeLog[]>;
    /**
     * Get daily report for timer logs based on the provided options.
     * @param options The options for retrieving the daily report.
     * @returns The daily report for timer logs.
     */
    getDailyReport(options: TimeLogQueryDTO): Promise<any | null>;
    /**
     * Get chart data for the daily report of timer logs based on the provided options.
     * @param options The options for retrieving the daily report chart data.
     * @returns The chart data for the daily report of timer logs.
     */
    getDailyReportChartData(options: TimeLogQueryDTO): Promise<any | null>;
    /**
     * Get report data for the owed amount based on the provided options.
     * @param options The options for retrieving the owed amount report data.
     * @returns The report data for the owed amount.
     */
    getOwedAmountReport(options: TimeLogQueryDTO): Promise<any | null>;
    /**
     * Get chart data for the owed amount report based on the provided options.
     * @param options The options for retrieving the owed amount report chart data.
     * @returns The chart data for the owed amount report.
     */
    getOwedAmountReportChartData(options: TimeLogQueryDTO): Promise<any | null>;
    /**
     * Get the weekly report for timer logs based on the provided options.
     * @param options The options for retrieving the weekly report.
     * @returns The weekly report for timer logs if found, otherwise null.
     */
    getWeeklyReport(options: TimeLogQueryDTO): Promise<any | null>;
    /**
     * Get the time limit report for timer logs based on the provided options.
     * @param options The options for retrieving the time limit report.
     * @returns The time limit report for timer logs if found, otherwise null.
     */
    getTimeLimitReport(options: TimeLogLimitQueryDTO): Promise<any | null>;
    /**
     * Get project budget limit based on the provided options.
     * @param options The options for retrieving the project budget limit.
     * @returns The project budget limit if found, otherwise null.
     */
    getProjectBudgetLimit(options: TimeLogQueryDTO): Promise<import("../../../plugins/contracts").IProjectBudgetLimitReport[]>;
    /**
     * Retrieve the client budget limit based on the provided options.
     * @param options The options for retrieving the client budget limit.
     * @returns The client budget limit if found; otherwise, null.
     */
    clientBudgetLimit(options: TimeLogQueryDTO): Promise<import("../../../plugins/contracts").IClientBudgetLimitReport[]>;
    /**
     * Get timer logs based on provided options.
     * @param options The options for querying timer logs.
     * @returns An array of timer logs.
     */
    getLogs(options: TimeLogQueryDTO): Promise<ITimeLog[]>;
    /**
     * Find time log by ID
     * @param id The ID of the time log.
     * @param options Additional options for finding the time log.
     * @returns The found time log.
     */
    findById(id: ITimeLog['id'], options: FindOneOptions): Promise<ITimeLog>;
    /**
     * Add manual time
     * @param entity The data for creating a manual time log.
     * @returns The created manual time log.
     */
    addManualTime(entity: CreateManualTimeLogDTO): Promise<ITimeLog>;
    /**
     * Update time log
     * @param id The ID of the time log entry to be updated.
     * @param entity The updated data for the manual time log.
     * @returns The updated time log entry.
     */
    updateManualTime(id: ITimeLog['id'], entity: UpdateManualTimeLogDTO): Promise<ITimeLog>;
    /**
     * Delete time log
     * @param deleteQuery The query parameters for deleting time logs.
     */
    deleteTimeLog(deleteQuery: DeleteTimeLogDTO): Promise<DeleteResult | UpdateResult>;
}
