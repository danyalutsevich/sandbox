import { ICommandHandler } from '@nestjs/cqrs';
import { UpdateTimeSlotCommand } from '../update-time-slot.command';
import { TimeSlot } from './../../time-slot.entity';
import { TypeOrmTimeSlotRepository } from '../../repository/type-orm-time-slot.repository';
import { TypeOrmActivityRepository } from '../../../activity/repository/type-orm-activity.repository';
export declare class UpdateTimeSlotHandler implements ICommandHandler<UpdateTimeSlotCommand> {
    private readonly typeOrmTimeSlotRepository;
    private readonly typeOrmActivityRepository;
    constructor(typeOrmTimeSlotRepository: TypeOrmTimeSlotRepository, typeOrmActivityRepository: TypeOrmActivityRepository);
    execute(command: UpdateTimeSlotCommand): Promise<TimeSlot>;
}
