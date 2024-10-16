import { ICommandHandler } from '@nestjs/cqrs';
import { ITimesheet } from '../../../../../plugins/contracts/dist/index';
import { TimeSheetService } from './../../../timesheet/timesheet.service';
import { TimesheetGetCommand } from './../timesheet-get.command';
export declare class TimesheetGetHandler implements ICommandHandler<TimesheetGetCommand> {
    private readonly _timesheetService;
    constructor(_timesheetService: TimeSheetService);
    execute(command: TimesheetGetCommand): Promise<ITimesheet>;
}
