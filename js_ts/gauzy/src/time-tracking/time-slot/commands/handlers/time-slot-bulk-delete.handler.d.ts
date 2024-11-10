import { ICommandHandler } from '@nestjs/cqrs';
import { TimeSlotBulkDeleteCommand } from '../time-slot-bulk-delete.command';
import { TypeOrmTimeSlotRepository } from '../../repository/type-orm-time-slot.repository';
export declare class TimeSlotBulkDeleteHandler implements ICommandHandler<TimeSlotBulkDeleteCommand> {
    private readonly typeOrmTimeSlotRepository;
    constructor(typeOrmTimeSlotRepository: TypeOrmTimeSlotRepository);
    execute(command: TimeSlotBulkDeleteCommand): Promise<boolean>;
}
