import { ICommandHandler, CommandBus } from '@nestjs/cqrs';
import { DeleteTimeSpanCommand } from '../delete-time-span.command';
import { TimeSlotService } from '../../../time-slot/time-slot.service';
import { TypeOrmTimeLogRepository } from '../../repository/type-orm-time-log.repository';
import { TypeOrmTimeSlotRepository } from '../../../time-slot/repository/type-orm-time-slot.repository';
export declare class DeleteTimeSpanHandler implements ICommandHandler<DeleteTimeSpanCommand> {
    readonly typeOrmTimeLogRepository: TypeOrmTimeLogRepository;
    private readonly typeOrmTimeSlotRepository;
    private readonly commandBus;
    private readonly timeSlotService;
    constructor(typeOrmTimeLogRepository: TypeOrmTimeLogRepository, typeOrmTimeSlotRepository: TypeOrmTimeSlotRepository, commandBus: CommandBus, timeSlotService: TimeSlotService);
    execute(command: DeleteTimeSpanCommand): Promise<boolean>;
    private syncTimeSlots;
}
