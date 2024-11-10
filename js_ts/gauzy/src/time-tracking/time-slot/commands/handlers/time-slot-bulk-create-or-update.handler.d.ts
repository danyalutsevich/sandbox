import { CommandBus, ICommandHandler } from '@nestjs/cqrs';
import { TimeSlot } from './../../time-slot.entity';
import { TimeSlotBulkCreateOrUpdateCommand } from './../time-slot-bulk-create-or-update.command';
import { TypeOrmTimeLogRepository } from '../../../time-log/repository/type-orm-time-log.repository';
import { TypeOrmTimeSlotRepository } from '../../repository/type-orm-time-slot.repository';
import { TypeOrmEmployeeRepository } from '../../../../employee/repository/type-orm-employee.repository';
export declare class TimeSlotBulkCreateOrUpdateHandler implements ICommandHandler<TimeSlotBulkCreateOrUpdateCommand> {
    private readonly typeOrmTimeLogRepository;
    private readonly typeOrmTimeSlotRepository;
    private readonly typeOrmEmployeeRepository;
    private readonly commandBus;
    constructor(typeOrmTimeLogRepository: TypeOrmTimeLogRepository, typeOrmTimeSlotRepository: TypeOrmTimeSlotRepository, typeOrmEmployeeRepository: TypeOrmEmployeeRepository, commandBus: CommandBus);
    execute(command: TimeSlotBulkCreateOrUpdateCommand): Promise<TimeSlot[]>;
}
