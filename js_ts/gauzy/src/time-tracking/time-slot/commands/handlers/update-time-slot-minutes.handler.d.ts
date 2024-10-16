import { ICommandHandler } from '@nestjs/cqrs';
import { TimeSlotMinute } from './../../time-slot-minute.entity';
import { UpdateTimeSlotMinutesCommand } from '../update-time-slot-minutes.command';
import { TypeOrmTimeSlotMinuteRepository } from '../../repository/type-orm-time-slot-minute.repository';
export declare class UpdateTimeSlotMinutesHandler implements ICommandHandler<UpdateTimeSlotMinutesCommand> {
    private readonly typeOrmTimeSlotMinuteRepository;
    constructor(typeOrmTimeSlotMinuteRepository: TypeOrmTimeSlotMinuteRepository);
    execute(command: UpdateTimeSlotMinutesCommand): Promise<TimeSlotMinute>;
}
