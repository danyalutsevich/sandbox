import { ICommandHandler } from '@nestjs/cqrs';
import { ITimesheet } from '../../../../../plugins/contracts/dist/index';
import { TimesheetCreateCommand } from '..';
import { TimeSheetService } from './../../timesheet.service';
export declare class TimesheetCreateHandler implements ICommandHandler<TimesheetCreateCommand> {
    private readonly _timesheetService;
    constructor(_timesheetService: TimeSheetService);
    execute(command: TimesheetCreateCommand): Promise<ITimesheet>;
}
