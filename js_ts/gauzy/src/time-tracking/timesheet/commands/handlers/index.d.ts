import { TimesheetCreateHandler } from './timesheet-create.handler';
import { TimesheetFirstOrCreateHandler } from './timesheet-first-or-create.handler';
import { TimesheetGetHandler } from './timesheet-get.handler';
import { TimesheetRecalculateHandler } from './timesheet-recalculate.handler';
import { TimesheetSubmitHandler } from './timesheet-submit.handler';
import { TimesheetUpdateStatusHandler } from './timesheet-update-status.handler';
export declare const CommandHandlers: (typeof TimesheetCreateHandler | typeof TimesheetFirstOrCreateHandler | typeof TimesheetGetHandler | typeof TimesheetRecalculateHandler | typeof TimesheetSubmitHandler | typeof TimesheetUpdateStatusHandler)[];
