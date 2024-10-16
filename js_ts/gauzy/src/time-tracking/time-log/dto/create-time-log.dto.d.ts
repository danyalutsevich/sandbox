import { IManualTimeInput, TimeLogSourceEnum, TimeLogType } from '../../../../plugins/contracts/dist/index';
import { ManualTimeLogDTO } from "./manual-time-log.dto";
/**
 * DTO for creating manual time logs.
 * Extends ManualTimeLogDTO and implements IManualTimeInput.
 */
export declare class CreateManualTimeLogDTO extends ManualTimeLogDTO implements IManualTimeInput {
    /**
    * Type of the time log (e.g., MANUAL).
    */
    logType: TimeLogType;
    /**
     * Source of the time log (e.g., WEB_TIMER).
     */
    source: TimeLogSourceEnum;
}
