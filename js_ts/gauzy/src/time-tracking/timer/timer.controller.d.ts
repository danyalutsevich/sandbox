import { ITimeLog, ITimerStatus } from '../../../plugins/contracts';
import { TimerService } from './timer.service';
import { StartTimerDTO, StopTimerDTO, TimerStatusQueryDTO } from './dto';
export declare class TimerController {
    private readonly timerService;
    constructor(timerService: TimerService);
    /**
     * GET timer today's status
     *
     * @param query
     * @returns
     */
    getTimerStatus(query: TimerStatusQueryDTO): Promise<ITimerStatus>;
    /**
     * GET timer last worked status
     *
     * @param query
     * @returns
     */
    getTimerWorkedStatus(query: TimerStatusQueryDTO): Promise<ITimerStatus[]>;
    /**
     *
     * @param entity
     * @returns
     */
    toggleTimer(entity: StartTimerDTO): Promise<ITimeLog | null>;
    /**
     *
     * @param entity
     * @returns
     */
    startTimer(entity: StartTimerDTO): Promise<ITimeLog>;
    /**
     *
     * @param entity
     * @returns
     */
    stopTimer(entity: StopTimerDTO): Promise<ITimeLog | null>;
}
