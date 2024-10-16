import { ICommandHandler, CommandBus } from '@nestjs/cqrs';
import { CreateTimeSlotMinutesCommand } from '../create-time-slot-minutes.command';
import { TimeSlotMinute } from './../../time-slot-minute.entity';
import { TypeOrmTimeSlotMinuteRepository } from '../../repository/type-orm-time-slot-minute.repository';
export declare class CreateTimeSlotMinutesHandler implements ICommandHandler<CreateTimeSlotMinutesCommand> {
    private readonly typeOrmTimeSlotMinuteRepository;
    private readonly commandBus;
    constructor(typeOrmTimeSlotMinuteRepository: TypeOrmTimeSlotMinuteRepository, commandBus: CommandBus);
    execute(command: CreateTimeSlotMinutesCommand): Promise<TimeSlotMinute>;
}
