import { ICommandHandler, CommandBus } from '@nestjs/cqrs';
import { DeleteTimeSlotCommand } from '../delete-time-slot.command';
import { TypeOrmTimeSlotRepository } from '../../repository/type-orm-time-slot.repository';
export declare class DeleteTimeSlotHandler implements ICommandHandler<DeleteTimeSlotCommand> {
    private readonly typeOrmTimeSlotRepository;
    private readonly commandBus;
    constructor(typeOrmTimeSlotRepository: TypeOrmTimeSlotRepository, commandBus: CommandBus);
    execute(command: DeleteTimeSlotCommand): Promise<boolean>;
}
