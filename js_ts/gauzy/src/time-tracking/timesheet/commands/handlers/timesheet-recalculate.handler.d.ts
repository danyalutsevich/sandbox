import { ICommandHandler } from '@nestjs/cqrs';
import { ITimesheet } from '../../../../../plugins/contracts/dist/index';
import { TimeSheetService } from '../../timesheet.service';
import { TimesheetRecalculateCommand } from '../timesheet-recalculate.command';
import { TypeOrmTimeSlotRepository } from '../../../time-slot/repository/type-orm-time-slot.repository';
export declare class TimesheetRecalculateHandler implements ICommandHandler<TimesheetRecalculateCommand> {
    private readonly timesheetService;
    private readonly typeOrmTimeSlotRepository;
    constructor(timesheetService: TimeSheetService, typeOrmTimeSlotRepository: TypeOrmTimeSlotRepository);
    /**
     *
     * @param command
     * @returns
     */
    execute(command: TimesheetRecalculateCommand): Promise<ITimesheet>;
}
