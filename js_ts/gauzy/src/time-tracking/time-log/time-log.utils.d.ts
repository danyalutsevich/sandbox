import { ITimeLog, ITimeSlot, TimeLogType } from '../../../plugins/contracts';
/**
 * Calculates the average of an array of numbers.
 * @param values An array of numbers.
 * @returns The calculated average.
 */
export declare const calculateAverage: (values: number[]) => number;
/**
 * Calculates the average activity based on overall and duration values of an array of time slots.
 * @param slots An array of time slots.
 * @returns The calculated average activity.
 */
export declare const calculateAverageActivity: (slots: ITimeSlot[]) => number;
/**
 * Calculate the total duration of a specific log type within a given array of time logs.
 * @param logs Array of time logs.
 * @param logType Type of the log (e.g., TRACKED, MANUAL, IDLE, RESUMED).
 * @returns Total duration of the specified log type in seconds.
 */
export declare const calculateDuration: (logs: ITimeLog[], logType: TimeLogType) => number;
