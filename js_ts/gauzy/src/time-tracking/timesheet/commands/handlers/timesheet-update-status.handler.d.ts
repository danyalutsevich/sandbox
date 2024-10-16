import { ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { ITimesheet } from '../../../../../plugins/contracts/dist/index';
import { EmailService } from './../../../../email-send/email.service';
import { TimesheetUpdateStatusCommand } from '../timesheet-update-status.command';
import { Timesheet } from './../../timesheet.entity';
export declare class TimesheetUpdateStatusHandler implements ICommandHandler<TimesheetUpdateStatusCommand> {
    private readonly timeSheetRepository;
    private readonly emailService;
    constructor(timeSheetRepository: Repository<Timesheet>, emailService: EmailService);
    execute(command: TimesheetUpdateStatusCommand): Promise<ITimesheet[]>;
}
