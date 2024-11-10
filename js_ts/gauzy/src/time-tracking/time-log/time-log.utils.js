"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDuration = exports.calculateAverageActivity = exports.calculateAverage = void 0;
const underscore_1 = require("underscore");
const index_1 = require("../../../plugins/common/dist/index");
/**
 * Calculates the average of an array of numbers.
 * @param values An array of numbers.
 * @returns The calculated average.
 */
const calculateAverage = (values) => {
    return (0, underscore_1.reduce)(values, index_1.ArraySum, 0);
};
exports.calculateAverage = calculateAverage;
/**
 * Calculates the average activity based on overall and duration values of an array of time slots.
 * @param slots An array of time slots.
 * @returns The calculated average activity.
 */
const calculateAverageActivity = (slots) => {
    const overallSum = (0, exports.calculateAverage)((0, underscore_1.pluck)(slots, 'overall'));
    const durationSum = (0, exports.calculateAverage)((0, underscore_1.pluck)(slots, 'duration'));
    return (overallSum * 100) / durationSum || 0;
};
exports.calculateAverageActivity = calculateAverageActivity;
/**
 * Calculate the total duration of a specific log type within a given array of time logs.
 * @param logs Array of time logs.
 * @param logType Type of the log (e.g., TRACKED, MANUAL, IDLE, RESUMED).
 * @returns Total duration of the specified log type in seconds.
 */
const calculateDuration = (logs, logType) => {
    return logs.filter((log) => log.logType === logType).reduce((totalDuration, log) => totalDuration + log.duration, 0);
};
exports.calculateDuration = calculateDuration;
//# sourceMappingURL=time-log.utils.js.map