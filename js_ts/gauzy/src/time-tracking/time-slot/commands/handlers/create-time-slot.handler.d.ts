import { CommandBus, ICommandHandler } from '@nestjs/cqrs';
import { TimeSlot } from './../../time-slot.entity';
import { CreateTimeSlotCommand } from '../create-time-slot.command';
import { TypeOrmTimeSlotRepository } from '../../repository/type-orm-time-slot.repository';
import { TypeOrmTimeLogRepository } from '../../../time-log/repository/type-orm-time-log.repository';
import { TypeOrmEmployeeRepository } from '../../../../employee/repository/type-orm-employee.repository';
export declare class CreateTimeSlotHandler implements ICommandHandler<CreateTimeSlotCommand> {
    private readonly typeOrmTimeSlotRepository;
    private readonly typeOrmTimeLogRepository;
    private readonly typeOrmEmployeeRepository;
    private readonly commandBus;
    private logging;
    constructor(typeOrmTimeSlotRepository: TypeOrmTimeSlotRepository, typeOrmTimeLogRepository: TypeOrmTimeLogRepository, typeOrmEmployeeRepository: TypeOrmEmployeeRepository, commandBus: CommandBus);
    execute(command: CreateTimeSlotCommand): Promise<TimeSlot>;
    /**
     * Private method for logging messages.
     * @param message - The message to be logged.
     */
    private log;
}
