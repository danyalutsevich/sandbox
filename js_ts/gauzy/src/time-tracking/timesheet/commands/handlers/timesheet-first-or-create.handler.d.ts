import { CommandBus, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { ITimesheet } from '../../../../../plugins/contracts/dist/index';
import { Employee, Timesheet } from './../../../../core/entities/internal';
import { TimesheetFirstOrCreateCommand } from './../timesheet-first-or-create.command';
export declare class TimesheetFirstOrCreateHandler implements ICommandHandler<TimesheetFirstOrCreateCommand> {
    private readonly timeSheetRepository;
    private readonly employeeRepository;
    private readonly commandBus;
    constructor(timeSheetRepository: Repository<Timesheet>, employeeRepository: Repository<Employee>, commandBus: CommandBus);
    execute(command: TimesheetFirstOrCreateCommand): Promise<ITimesheet>;
}
