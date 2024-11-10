import { ICommandHandler } from '@nestjs/cqrs';
import { ITimeSlot } from '../../../../../plugins/contracts/dist/index';
import { TimeSlotCreateCommand } from './../time-slot-create.command';
import { TypeOrmTimeSlotRepository } from '../../repository/type-orm-time-slot.repository';
export declare class TimeSlotCreateHandler implements ICommandHandler<TimeSlotCreateCommand> {
    private readonly typeOrmTimeSlotRepository;
    constructor(typeOrmTimeSlotRepository: TypeOrmTimeSlotRepository);
    execute(command: TimeSlotCreateCommand): Promise<ITimeSlot>;
}
