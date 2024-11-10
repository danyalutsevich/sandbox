import moment from 'moment';
export declare function generateTimeSlots(start: Date, end: Date): any[];
/**
 * GET start and end point of 10 minutes interval
 *
 * @param start
 * @param end
 * @returns
 */
export declare function getStartEndIntervals(start: moment.Moment, end: moment.Moment): {
    start: string | Date;
    end: string | Date;
};
