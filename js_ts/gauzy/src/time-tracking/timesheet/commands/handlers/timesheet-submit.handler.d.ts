import { ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { ITimesheet } from '../../../../../plugins/contracts/dist/index';
import { EmailService } from './../../../../email-send/email.service';
import { Timesheet } from './../../timesheet.entity';
import { TimesheetSubmitCommand } from '../timesheet-submit.command';
export declare class TimesheetSubmitHandler implements ICommandHandler<TimesheetSubmitCommand> {
    private readonly timeSheetRepository;
    private readonly emailService;
    constructor(timeSheetRepository: Repository<Timesheet>, emailService: EmailService);
    execute(command: TimesheetSubmitCommand): Promise<ITimesheet[]>;
}
